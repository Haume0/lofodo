import { notFound } from "next/navigation";
import { getBackground } from "@/actions/backgrounds";
import { getRadios } from "@/actions/radios";
import BackgroundsPanel from "./BackgroundsPanel";
import RadiosPanel from "./RadiosPanel";

// No login: the admin edits files committed to git, so it only runs on a
// local dev server and anyone able to publish changes already has repo access.
export default async function AdminPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const [radios, backgrounds] = await Promise.all([
    getRadios(),
    getBackground(),
  ]);
  return (
    <section className="p-3 sm:p-6 lg:p-8 flex flex-col gap-4 min-h-dvh max-w-6xl mx-auto scheme-dark">
      <header>
        <h1 className="text-3xl sm:text-4xl font-black">LOFODO Admin</h1>
        <p className="font-jetbrains-mono text-sm text-white/60">
          Dev only. Changes are written to <code>data/radios.json</code> and{" "}
          <code>public/backgrounds</code>; commit them to publish.
        </p>
      </header>
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <RadiosPanel radios={radios} />
        <BackgroundsPanel backgrounds={backgrounds} />
      </div>
    </section>
  );
}
