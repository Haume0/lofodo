"use server";
import fs from "node:fs";
import { revalidatePath } from "next/cache";
import { getVideoId } from "@/components/youtube";

const radiosPath = "data/radios.json";

export async function getRadios(): Promise<string[]> {
  return JSON.parse(fs.readFileSync(radiosPath, "utf-8"));
}

// Admin writes go to files tracked in git, so they only make sense locally;
// a deployed container would lose them anyway.
// Returns an error message, or null on success.
export async function addRadio(url: string): Promise<string | null> {
  if (process.env.NODE_ENV !== "development") return "Admin is dev-only.";
  const videoId = getVideoId(url);
  if (!videoId) return "Not a valid YouTube URL.";
  const radios = await getRadios();
  if (radios.some((radio) => getVideoId(radio) === videoId)) {
    return "This radio is already in the list.";
  }
  radios.push(`https://www.youtube.com/watch?v=${videoId}`);
  fs.writeFileSync(radiosPath, JSON.stringify(radios, null, 2));
  revalidatePath("/", "layout");
  return null;
}

// Removes every entry with this video id, which also cleans up old duplicates.
export async function removeRadio(videoId: string): Promise<string | null> {
  if (process.env.NODE_ENV !== "development") return "Admin is dev-only.";
  const radios = await getRadios();
  const remaining = radios.filter((radio) => getVideoId(radio) !== videoId);
  if (remaining.length === radios.length) return "Radio not found.";
  fs.writeFileSync(radiosPath, JSON.stringify(remaining, null, 2));
  revalidatePath("/", "layout");
  return null;
}
