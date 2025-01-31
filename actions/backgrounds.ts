"use server";

import fs from "fs";
export interface Background {
  name: string;
  image: string;
}
export async function getBackground() {
  //reading public/backgrounds
  const backgrounds = fs.readdirSync("public/backgrounds");
  const data: Background[] = backgrounds.map((background) => {
    return {
      name: background.split(".")[0],
      image: `/backgrounds/${background}`,
    };
  });
  return data;
}
