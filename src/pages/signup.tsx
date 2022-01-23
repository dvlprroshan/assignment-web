import React, { useState } from "react";
import style from "@/styles/SignUpPage.module.scss";
import InputElm from "@/components/elm/InputElm";
import SubmitBtn from "@/components/elm/SubmitBtn";
import Link from "next/link";

const SignUpPageMainForm = () => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  type AvailFields = "first_name" | "last_name" | "email" | "password";
  type FormErrorListType = {
    error: string;
    props: AvailFields;
  }[];
  const initialErrorState: [] = [];
  const [formErrors, setFormErrors] =
    useState<FormErrorListType>(initialErrorState);
  const handleInputElm =
    (labelName: "first_name" | "last_name" | "email" | "password") =>
    (e: any) => {
      setFormValue({ ...formValue, [labelName]: e.target.value ?? "" });
    };

  // console.log(formErrors);

  const formHandler = {
    submitForm: (e: any) => {
      setFormErrors([]);

      fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(formValue),
      }).then((e) => {
        e.json().then((data) => {
          if (data.errorList) {
            setFormErrors(data.erriorList);
          } else if (data.success) {
            console.log("sucess");
            // redirect to login page
            window.location.href = "/login";
          }
        });
      });
    },
  };

  return (
    <div className={style.signup_page_form}>
      <form action="POST">
        {/* top btns */}
        <div className={style.change_page}>
          <div>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </div>
          <div className={style.cp_active}>Register</div>
        </div>

        {/* <div className={style.spf_title}>Register Yourself</div> */}
        <div className={style.full_name}>
          {/* first name */}
          <InputElm
            name="first_name"
            label="First Name"
            placeholder="eg. John"
            otherProps={{
              onChange: handleInputElm("first_name"),
              value: formValue.first_name,
            }}
          />
          {/* last name */}
          <InputElm
            name="last_name"
            label="Last Name"
            placeholder="eg. Doe"
            otherProps={{
              onChange: handleInputElm("last_name"),
              value: formValue.last_name,
            }}
          />
        </div>
        {/* email id */}
        <InputElm
          name="email"
          label="Email Address"
          placeholder="eg. somthing@domian.com"
          type="email"
          otherProps={{
            onChange: handleInputElm("email"),
            value: formValue.email,
          }}
        />
        {/* password */}
        <InputElm
          name="password"
          label="Password"
          placeholder="Enter your password..."
          type="password"
          otherProps={{
            onChange: handleInputElm("password"),
            value: formValue.password,
          }}
        />
        <ul className={style.error_list}>
          {formErrors.map((error, index) => (
            <li key={index}>{error.error}</li>
          ))}
        </ul>
        <SubmitBtn
          text="Create Account"
          otherProps={{
            onClick: (e: any) => {
              e.preventDefault();
              formHandler.submitForm(e);
              // console.log(formValue);
            },
          }}
        />
        {/* <div className={style.have_acc}>
          Already a member?{" "}
          <Link href="/login">
            <a>login</a>
          </Link>
        </div> */}
      </form>
    </div>
  );
};

const SignUpPage = () => {
  return (
    <div className={style.main_fm}>
      <SignUpPageMainForm />
    </div>
  );
};

export default SignUpPage;
