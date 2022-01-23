import style from "@/styles/elm/SubmitBtn.module.scss";
import type {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactElement,
} from "react";

type SubmitBtnProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  otherProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

const SubmitBtn: FunctionComponent<SubmitBtnProps> = ({
  text,
  otherProps = {},
  type = "submit",
}): ReactElement<HTMLButtonElement> => {
  return (
    <button
      className={style.contact_form_submit_btn}
      type={type}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
