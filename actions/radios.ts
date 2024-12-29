"use server"
import fs from "fs"

export async function getRadios() {
  const radios = fs.readFileSync("data/radios.json", "utf-8")
  return JSON.parse(radios)
}