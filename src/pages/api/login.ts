import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/utils/helpers/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let errorList: { field: string; error: string }[] = [];
    // const prisma = new PrismaClient();

    // read the request body and extract email and password
    let formData = JSON.parse(req.body || "need to send data");
    let { email, password } = formData;

    // validate email
    if (!email) {
      errorList.push({ field: "email", error: "Please Enter your email" });
    } else if (!password) {
      errorList.push({
        field: "password",
        error: "Please Enter your password",
      });
    } else if (!(await prisma.user.findFirst({ where: { email, password } }))) {
      errorList.push({ field: "both", error: "Entered Invalid credentials" });
    }

    // if there are any errors, return the errors
    if (errorList.length > 0) {
      res.status(400).json({ errorList });
      console.log(errorList);
    } else {
      // if there are no errors, return the user
      res.status(200).json({
        token: jwt.sign(
          { email: formData.email },
          process.env.JWT_SECRET || "private",
          {
            expiresIn: "10h",
          }
        ),
        //   process.env.JWT_SECRET,
      });
    }
  } else {
    res.status(400).end("please enter valid request!");
  }
}
