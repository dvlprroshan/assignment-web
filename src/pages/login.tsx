import React, { useState } from "react";
import style from "@/styles/LoginPage.module.scss";
import InputElm from "@/components/elm/InputElm";
import SubmitBtn from "@/components/elm/SubmitBtn";
import Link from "next/link";
import checkCommanUser from "@/utils/helpers/checkCommanUser";

// const SelectElm = () =>{}

type FormData = {
  email: string;
  password: string;
};

export async function getServerSideProps({ req }: { req: any }) {
  const user = await checkCommanUser(req);
  // console.log("loginpage", req.headers);
  return !user?.full_name
    ? {
        props: {
          user: null,
        },
      }
    : { redirect: { destination: "/", permanent: false } };
}

const LoginFormPage = ({ user }: any) => {
  // console.log(posts);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<
    { field: string; error: string }[]
  >([]);

  return (
    <div className={style.login_page_form}>
      <form action="POST">
        {/* <div className={style.lpf_title}>LOGIN NOW</div> */}
        {/* top btns */}
        <div className={style.change_page}>
          <div className={style.cp_active}>Login</div>
          <div>
            <Link href="/signup">
              <a>Register</a>
            </Link>
          </div>
        </div>

        <InputElm
          name="email"
          label="Email Address"
          placeholder="eg. somthing@domian.com"
          type="email"
          otherProps={{
            required: true,
            value: formData.email,
            onChange: (e: any) =>
              setFormData({ ...formData, email: e.target.value }),
          }}
          // errorWithOldValue="Roshan"
        />
        <InputElm
          name="password"
          label="Password"
          placeholder="Enter your password..."
          type="password"
          otherProps={{
            required: true,
            value: formData.password,
            onChange: (e: any) =>
              setFormData({ ...formData, password: e.target.value }),
          }}
          // vaule={123}
          // otherProps={{ value: 123, }}
        />
        <ul className={style.errorList}>
          {formErrors.map((error: { [key: string]: string }, index: number) => (
            <li key={index}>{error.error}</li>
          ))}
        </ul>
        <SubmitBtn
          text="Login Now"
          otherProps={{
            onClick: (e: any) => {
              e.preventDefault();
              fetch("/api/login", {
                method: "POST",
                body: JSON.stringify(formData),
              }).then((e) => {
                // console.log(e);
                e.json().then((data) => {
                  if (data.errorList) {
                    setFormErrors(data.errorList);
                  } else if (data.token) {
                    document.cookie = `token=${data.token};`;
                    document.location.href = "/";
                  }
                });
              });
            },
          }}
        />
        {/* <div className={style.have_acc}>
          Don’t have an account ?{" "}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </div> */}
      </form>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className={style.main_fm}>
      {/* <TopHeaderBar /> */}
      {/* <NavbarMain /> */}
      {/* <Breadcrumbs title="Login" /> */}
      <LoginFormPage />
      {/* <FotterMain /> */}
    </div>
  );
};

export default LoginPage;
