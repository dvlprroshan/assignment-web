import parseCookie from "@/utils/helpers/parseCookie";
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res
    ?.status(200)
    .setHeader("Set-Cookie", "token=none")
    .end("logout successfully");
}
