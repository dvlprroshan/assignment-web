import style from "@/styles/elm/InputElm.module.scss";
import {
  FunctionComponent,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from "react";

type InputElmProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  otherProps?: InputHTMLAttributes<HTMLInputElement>;
  errorWithOldValue?: string;
};

const InputElm: FunctionComponent<InputElmProps> = ({
  name,
  label,
  placeholder,
  type,
  otherProps = {},
  errorWithOldValue = undefined,
}: InputElmProps): ReactElement => {
  const [inputVal, setInputVal] = useState("");
  return (
    <div
      className={`${style.input_elm} ${
        typeof errorWithOldValue === "undefined" ? "" : style.input_elm_error
      }`}
    >
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        id={name}
        type={type ?? "text"}
        name={name}
        {...otherProps}
      />
    </div>
  );
};

export default InputElm;
