"use server";
import fs from "fs/promises";
import crypto from "crypto";

const salt = "me.haume.lofodo.app_duz_anthr";
const usersPath = "data/users.json";
let tokenExpiryTime = 60000; // Global variable for token expiry time

export interface IUserAuth {
  name: string;
  password: string;
}
export interface IUser extends IUserAuth {
  role: string;
}

async function getUsers(): Promise<IUser[]> {
  const data = await fs.readFile(usersPath, "utf-8");
  return JSON.parse(data);
}

export async function checkUser(
  userdata: IUserAuth,
): Promise<[boolean, string]> {
  const users = await getUsers();
  const userExists = users.some(
    (user) =>
      user.name === userdata.name && user.password === userdata.password,
  );
  const exp = Date.now() + tokenExpiryTime;
  const hash =
    crypto
      .createHash("sha512")
      .update(`${userdata.name}:${exp}:${userdata.password}:${salt}`)
      .digest("hex") + `_${userdata.name}:${exp}`;
  return [userExists, hash];
}

export async function checkToken(
  token: string,
): Promise<[boolean, IUser | null]> {
  const users = await getUsers();
  const [hash, tokenData] = token.split("_");
  const [username, exp] = tokenData.split(":");
  const foundedUser = users.find((user) => user.name === username);

  if (
    !foundedUser ||
    parseInt(exp) < Date.now() ||
    parseInt(exp) > Date.now() + tokenExpiryTime
  ) {
    return [false, null];
  }

  const validHash = crypto
    .createHash("sha512")
    .update(`${username}:${exp}:${foundedUser.password}:${salt}`)
    .digest("hex");

  // Check if the hash matches and if the token data has not been tampered with
  const isValid = validHash === hash && tokenData === `${username}:${exp}`;
  return [isValid, isValid ? foundedUser : null];
}
