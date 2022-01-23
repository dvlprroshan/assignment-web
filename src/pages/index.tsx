import style from "@/styles/Home.module.scss";
import { NextPageContext } from "next";
import checkCommanUser from "@/utils/helpers/checkCommanUser";
import Link from "next/link";

export async function getServerSideProps({ req }: NextPageContext) {
  let user = await checkCommanUser(req);
  return user?.full_name
    ? { props: { user } }
    : {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
}

const AccountsPage = ({ user }: any) => {
  return (
    <div className={style.main_p}>
      <div className={style.italic}>Hello {user.full_name} </div>
      <Link href="/logout">
        <a className={style.logout}>Logout</a>
      </Link>
    </div>
  );
};

export default AccountsPage;
