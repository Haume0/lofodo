"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";

const backgroundsDir = "public/backgrounds";
const allowedExtensions = [".gif", ".webp", ".png", ".jpg", ".jpeg"];

export interface Background {
  name: string;
  image: string;
}
export async function getBackground() {
  const backgrounds = fs.readdirSync(backgroundsDir);
  const data: Background[] = backgrounds.map((background) => {
    return {
      name: background.split(".")[0],
      image: `/backgrounds/${background}`,
    };
  });
  return data;
}

// Same dev-only rule as the radio actions: files land in git-tracked public/.
// Returns an error message, or null on success.
export async function addBackground(
  formData: FormData,
): Promise<string | null> {
  if (process.env.NODE_ENV !== "development") return "Admin is dev-only.";
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return "Choose a file.";
  const extension = path.extname(file.name).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return `Allowed types: ${allowedExtensions.join(", ")}`;
  }
  // The name becomes the file name, so keep it to a safe slug; this also
  // blocks path traversal like "../".
  const name = String(formData.get("name") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!name) return "Enter a name.";
  if ((await getBackground()).some((background) => background.name === name)) {
    return "A background with this name already exists.";
  }
  fs.writeFileSync(
    path.join(backgroundsDir, name + extension),
    Buffer.from(await file.arrayBuffer()),
  );
  revalidatePath("/", "layout");
  return null;
}

export async function removeBackground(name: string): Promise<string | null> {
  if (process.env.NODE_ENV !== "development") return "Admin is dev-only.";
  // Only accept names that exist in the folder, never a raw path from the client.
  const background = (await getBackground()).find((item) => item.name === name);
  if (!background) return "Background not found.";
  fs.unlinkSync(path.join("public", background.image));
  revalidatePath("/", "layout");
  return null;
}
