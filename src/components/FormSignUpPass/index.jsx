import { useState } from "react";
import EyeClose from "../../assets/SignUpIcons/eye-close.svg";
import EyeOpen from "../../assets/SignUpIcons/eye-open.svg";
import "./styles.css";

export default function FormSignUp({ form, setForm, errors }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  function onChange(e) {
    if (e.nativeEvent.data === " ") return;
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <>
      <h1 className="form__title">Escolha uma senha</h1>
      <form>
        <div className="container__input">
          <label>Senha *</label>
          <input
            style={{ borderColor: errors.pass ? "red" : "#d0d5dd" }}
            type={showPass ? "text" : "password"}
            name="pass"
            placeholder="••••••••"
            onChange={onChange}
            value={Object.values(form)[2]}
          />
          <img
            className="eyeIcon"
            src={showPass ? EyeOpen : EyeClose}
            onClick={() => {
              setShowPass(!showPass);
            }}
            alt="Mostrar a senha"
          />
          {errors.pass && <span className="errorInput">{errors.pass}</span>}
        </div>
        <div className="container__input">
          <label>Repita a senha *</label>
          <input
            style={{ borderColor: errors.confirmPass ? "red" : "#d0d5dd" }}
            type={showConfirmPass ? "text" : "password"}
            name="confirmPass"
            placeholder="••••••••"
            onChange={onChange}
            value={Object.values(form)[3]}
          />
          <img
            className="eyeIcon"
            src={showConfirmPass ? EyeOpen : EyeClose}
            onClick={() => {
              setShowConfirmPass(!showConfirmPass);
            }}
            alt="Mostrar a senha"
          />
          {errors.confirmPass && (
            <span className="errorInput">{errors.confirmPass}</span>
          )}
        </div>
      </form>
    </>
  );
}
