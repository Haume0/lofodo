"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  addBackground,
  type Background,
  removeBackground,
} from "@/actions/backgrounds";
import TrashIcon from "./TrashIcon";

export default function BackgroundsPanel(props: { backgrounds: Background[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Object URLs hold the file in memory until revoked.
  useEffect(() => {
    if (!file) return setPreview(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="bgblur-4 flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
      <h2 className="text-2xl font-black">
        Backgrounds{" "}
        <span className="text-white/40 font-light">
          {props.backgrounds.length}
        </span>
      </h2>
      <form
        ref={formRef}
        action={(formData) =>
          startTransition(async () => {
            const result = await addBackground(formData);
            setError(result);
            if (result) return;
            formRef.current?.reset();
            setFile(null);
            setName("");
          })
        }
        className="flex flex-col gap-2"
      >
        <label className="relative flex items-center justify-center h-40 rounded-xl overflow-hidden bg-black/20 border-2 border-dashed border-white/20 hover:border-white/40 duration-300 ease-in-out cursor-pointer">
          {preview ? (
            <img
              src={preview}
              alt="Selected background preview"
              className="size-full object-cover"
            />
          ) : (
            <span className="text-white/50 text-center px-4">
              Choose a gif, webp, png or jpg
            </span>
          )}
          <input
            type="file"
            name="file"
            accept=".gif,.webp,.png,.jpg,.jpeg"
            className="sr-only"
            onChange={(e) => {
              const selected = e.target.files?.[0] ?? null;
              setFile(selected);
              setError(null);
              // Prefill the name from the file, still editable.
              if (selected && !name)
                setName(selected.name.replace(/\.[^.]+$/, ""));
            }}
          />
        </label>
        {file && (
          <p className="text-sm text-white/50 font-jetbrains-mono">
            {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
        <span className="flex gap-1">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name, e.g. rainy-window"
            className="px-3 w-full rounded-xl h-10 bg-white/10 focus:bg-white/20 border border-transparent ease-in-out focus:border-white/20 outline-hidden duration-300"
          />
          <button
            type="submit"
            disabled={!file || !name.trim() || pending}
            className="px-5 shrink-0 h-10 bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300 disabled:opacity-50 disabled:pointer-events-none"
          >
            {pending ? "Uploading…" : "Upload"}
          </button>
        </span>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[70dvh] overflow-auto">
        {props.backgrounds.map((background) => (
          <li
            key={background.name}
            className="group relative aspect-video rounded-xl overflow-hidden bg-black/20 border border-white/10"
          >
            <img
              src={background.image}
              alt={background.name}
              loading="lazy"
              className="size-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 p-1 pl-2 bg-linear-to-t from-black/80 to-transparent">
              <p className="truncate text-sm font-jetbrains-mono">
                {background.name}
              </p>
              <button
                type="button"
                title="Remove background."
                onClick={() => {
                  if (!confirm(`Remove "${background.name}"?`)) return;
                  startTransition(async () =>
                    setError(await removeBackground(background.name)),
                  );
                }}
                className="size-8 shrink-0 flex items-center justify-center bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-transparent ease-in-out hover:border-red-500/30 rounded-lg duration-300"
              >
                <TrashIcon />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
