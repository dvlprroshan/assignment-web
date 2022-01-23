import { NextPageContext } from "next";
import checkCommanUser from "@/utils/helpers/checkCommanUser";
// import document from "next/document";

export async function getServerSideProps({ req, res }: NextPageContext) {
  // logout user
  const user = await checkCommanUser(req);
  return user
    ? {
        props: {
          message: "Logout Successfully...",
        },
      }
    : { redirect: { destination: "/login", permanent: false } };
}

export default function LogoutUser({ message }: any) {
  // run code on client slide
  if (typeof window !== "undefined") {
    let document: Document | any = window.document ?? {};
    setTimeout(
      `
    document.cookie = "token=none;";
    `,
      1
    );
    setTimeout(() => {
      document.location.href = "/login";
    }, 1000);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        fontSize: "2rem",
        color: "white",
        background: "url('/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
      }}
    >
      {message}{" "}
    </div>
  );
}
