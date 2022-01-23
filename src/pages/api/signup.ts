import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/helpers/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let errorList: { field: string; error: string }[] = [];

  // trim all requested data
  let formData = JSON.parse(req.body);
  Object.keys(formData).forEach((key: string) => {
    formData[key] = formData[key] ? formData[key].trim() : "";
  });

  let { first_name, last_name, email, password } = formData;

  // validate first name
  if (!first_name) {
    errorList.push({ field: "first_name", error: "Please Enter your name" });
  } else if (first_name.length < 3) {
    errorList.push({
      field: "first_name",
      error: "Name must be at least 3 characters",
    });
  }

  // validate email
  if (!email) {
    errorList.push({ field: "email", error: "Please Enter your email" });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errorList.push({ field: "email", error: "Invalid email address" });
  } else if (await prisma.user.findUnique({ where: { email } })) {
    errorList.push({ field: "email", error: "Email already exists" });
  }

  // validate password
  if (!password) {
    errorList.push({ field: "password", error: "Please Enter your password" });
  } else if (password.length < 6) {
    errorList.push({
      field: "password",
      error: "Password must be at least 6 characters",
    });
  }

  // if there is any error
  if (errorList.length > 0) {
    res.status(400).json({ errorList });
  } else {
    prisma.user
      .create({
        data: {
          full_name: `${first_name} ${last_name}`,
          email: formData.email,
          password: formData.password,
        },
      })
      .then((user: any) => {
        res.status(200).json({ success: "User created successfully" });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
