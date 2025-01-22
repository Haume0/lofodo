"use server";
import { checkToken } from "@/auth";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getRadios(): Promise<string[]> {
  const radiosData = fs.readFileSync("data/radios.json", "utf-8");
  const radios = JSON.parse(radiosData);
  return radios;
}

export async function updateRadio(
  old_url: string,
  new_url: string,
): Promise<boolean> {
  const hwt = (await cookies()).get("hwt")?.value || "";
  if ((await checkToken(hwt))[1]?.role != "admin") return false;
  let radios: string[] = JSON.parse(
    fs.readFileSync("data/radios.json", "utf-8"),
  );
  //finding index by old_url
  const index = radios.findIndex((item) => item == old_url);
  radios[index] = new_url;
  fs.writeFileSync("data/radios.json", JSON.stringify(radios));
  revalidatePath("/");
  return true;
}

export async function addRadio(url: string): Promise<boolean> {
  const hwt = (await cookies()).get("hwt")?.value || "";
  if ((await checkToken(hwt))[1]?.role != "admin") return false;
  let radios: string[] = JSON.parse(
    fs.readFileSync("data/radios.json", "utf-8"),
  );
  radios.push(url);
  fs.writeFileSync("data/radios.json", JSON.stringify(radios));
  revalidatePath("/");
  return true;
}
export async function removeRadio(rm_url: string): Promise<boolean> {
  const hwt = (await cookies()).get("hwt")?.value || "";
  if ((await checkToken(hwt))[1]?.role != "admin") return false;
  let radios: string[] = JSON.parse(
    fs.readFileSync("data/radios.json", "utf-8"),
  );
  //finding index by old_url
  const index = radios.findIndex((item) => item == rm_url);
  radios.splice(index, 1);
  fs.writeFileSync("data/radios.json", JSON.stringify(radios));
  revalidatePath("/");
  return true;
}
