import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IconSucess from "../../assets/SignUpIcons/icon-sucess.svg";
import FormEmail from "../../components/FormSignUpEmail";
import FormPass from "../../components/FormSignUpPass";
import Stepper from "../../components/StepperSignUp";
import api from "../../services/api";
import "./styles.css";

function SignUp() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const [errorInput, setErrorInput] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  function handleNextPage() {
    if (!form.name) {
      return setErrorInput({
        ...errorInput,
        name: "Você deve informar o seu nome.",
      });
    }
    if (!form.email) {
      return setErrorInput({
        ...errorInput,
        email: "Você deve informar o seu e-mail.",
        name: "",
      });
    }
    setPage(1);
    setActiveStep(1);
  }

  async function handleSubmit() {
    if (!form.pass) {
      return setErrorInput({
        ...errorInput,
        pass: "Você deve informar a sua senha.",
      });
    }
    if (form.pass !== form.confirmPass || !form.confirmPass) {
      return setErrorInput({
        ...errorInput,
        confirmPass: "As senhas não coincidem.",
        pass: "",
      });
    }
    if (form.pass.length < 8) {
      return setErrorInput({
        ...errorInput,
        confirmPass: "",
        pass: "A senha deve conter no mínimo 8 dígitos.",
      });
    }
    try {
      await api.post("usuario", {
        nome: form.name,
        email: form.email,
        senha: form.pass,
      });
      setPage(2);
      setActiveStep(3);
    } catch (error) {
      setPage(0);
      return setErrorInput({
        ...errorInput,
        email: error.response.data.mensagem,
        name: "",
      });
    }
  }

  return (
    <div className="container__signUp">
      <div className="signUp__left">
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
      <div className="signUp__right">
        {page === 0 && (
          <div className="container__form">
            <FormEmail form={form} setForm={setForm} errors={errorInput} />

            <button className="form__btn" onClick={handleNextPage}>
              Continuar
            </button>
            <span className="form__footer">
              Já possui uma conta? Faça seu <Link to="/">Login</Link>
            </span>
          </div>
        )}
        {page === 1 && (
          <div className="container__form">
            <FormPass form={form} setForm={setForm} errors={errorInput} />

            <button className="form__btn" onClick={handleSubmit}>
              Finalizar cadastro
            </button>
            <span className="form__footer">
              Já possui uma conta? Faça seu <Link to="/">Login</Link>
            </span>
          </div>
        )}
        {page === 2 && (
          <div className="container__sucess">
            <div className="card__sucess">
              <img src={IconSucess} alt="Cadastro feito com sucesso!" />
              <h1 className="form__title">Cadastro realizado com sucesso!</h1>
            </div>
            <button
              className="form__btn sucess__btn"
              onClick={() => navigate("/")}
            >
              Ir para Login
            </button>
          </div>
        )}
        <div className="container__progressBar">
          <div id="0" className={page === 0 ? "bar select" : "bar"} />
          <div id="1" className={page === 1 ? "bar select" : "bar"} />
          <div id="2" className={page === 2 ? "bar select" : "bar"} />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
