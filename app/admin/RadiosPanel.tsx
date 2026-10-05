"use client";

import { useEffect, useState, useTransition } from "react";
import { addRadio, removeRadio } from "@/actions/radios";
import { getVideoId } from "@/components/youtube";
import TrashIcon from "./TrashIcon";

export default function RadiosPanel(props: { radios: string[] }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const videoId = getVideoId(url);
  // The same video can be stored under different URL shapes, compare ids.
  const ids = props.radios.map(getVideoId);
  const duplicate = videoId !== null && ids.includes(videoId);

  return (
    <div className="bgblur-4 flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-2xl font-black">
        Radios <span className="text-white/40 font-light">{ids.length}</span>
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(async () => {
            const result = await addRadio(url);
            setError(result);
            if (!result) setUrl("");
          });
        }}
        className="flex flex-col gap-2"
      >
        <span className="flex gap-1">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            placeholder="Paste a YouTube URL."
            className="px-3 w-full rounded-xl h-10 bg-white/10 focus:bg-white/20 border border-transparent ease-in-out focus:border-white/20 outline-hidden duration-300"
          />
          <button
            type="submit"
            disabled={!videoId || duplicate || pending}
            className="px-5 shrink-0 h-10 bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {pending ? "Adding…" : "Add"}
          </button>
        </span>
        {url && !videoId && (
          <p className="text-sm text-red-400">Not a valid YouTube URL.</p>
        )}
        {duplicate && (
          <p className="text-sm text-yellow-400">
            This radio is already in the list.
          </p>
        )}
        {error && <p className="text-sm text-red-400">{error}</p>}
        {videoId && !duplicate && (
          <RadioCard videoId={videoId} className="border-purple-500/40" />
        )}
      </form>
      <ul className="flex flex-col gap-2 max-h-[70dvh] overflow-auto">
        {/* Newest first; duplicates in old data share an id, so only the first is listed. */}
        {[...new Set(ids)].reverse().map(
          (id) =>
            id && (
              <li key={id}>
                <RadioCard videoId={id}>
                  <button
                    type="button"
                    title="Remove radio."
                    onClick={() => {
                      if (!confirm("Remove this radio?")) return;
                      startTransition(async () =>
                        setError(await removeRadio(id)),
                      );
                    }}
                    className="size-10 shrink-0 flex items-center justify-center bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-transparent ease-in-out hover:border-red-500/30 rounded-xl duration-300"
                  >
                    <TrashIcon />
                  </button>
                </RadioCard>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

// Shared by the live preview and the list. Title comes from YouTube oEmbed,
// which allows browser CORS requests.
function RadioCard(props: {
  videoId: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [info, setInfo] = useState<{ title: string; author: string } | null>(
    null,
  );
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setInfo(null);
    setFailed(false);
    fetch(
      `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${props.videoId}`,
      { signal: controller.signal },
    )
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setInfo({ title: data.title, author: data.author_name }))
      .catch(() => !controller.signal.aborted && setFailed(true));
    return () => controller.abort();
  }, [props.videoId]);

  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-xl bg-black/20 border border-white/10 ${props.className ?? ""}`}
    >
      <a
        href={`https://www.youtube.com/watch?v=${props.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
      >
        <img
          src={`https://i.ytimg.com/vi/${props.videoId}/mqdefault.jpg`}
          alt=""
          className="w-28 aspect-video object-cover rounded-lg bg-white/5"
        />
      </a>
      <span className="flex-1 min-w-0">
        <p className="truncate font-bold">
          {info?.title ?? (failed ? "Unavailable video" : "Loading…")}
        </p>
        <p className="truncate text-sm text-white/50 font-jetbrains-mono">
          {info?.author ?? props.videoId}
        </p>
        {failed && (
          <p className="text-xs text-red-400">
            Private, deleted or not embeddable.
          </p>
        )}
      </span>
      {props.children}
    </div>
  );
}
