import jwt from "jsonwebtoken";
import prisma from "./prisma";
import parseCookie from "./parseCookie";

const checkCommanUser = async (req: any) => {
  // check token in parsed cookie
  let currentUser: any = null;
  try {
    let token = parseCookie(req.headers.cookie || "")["token"];
    // console.log("token", token);
    currentUser = jwt.verify(token, process.env.JWT_SECRET || "private");
    const userData = await prisma.user.findUnique({
      where: { email: currentUser.email },
      select: { email: true, full_name: true },
    });

    return userData;
  } catch (e) {
    return null;
  }
};

export default checkCommanUser;
