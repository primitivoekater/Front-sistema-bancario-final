import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem, setItem } from "../../utils/storage";
import "./styles.css";

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [errorsAdvice, setErrorsAdvice] = useState({ email: "", senha: "" });
  const { setUser } = useGlobalContext();

  function handleChangeInputValue(event) {
    if (event.nativeEvent.data === " ") return;
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    if (getItem("token")) {
      navigate("/main");
    }
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.email) {
        return setErrorsAdvice({
          ...errorsAdvice,
          email: "Você deve informar o e-email!",
        });
      }
      if (!form.senha) {
        return setErrorsAdvice({
          ...errorsAdvice,
          email: "",
          senha: "Você deve informar a senha!",
        });
      }

      const response = await api.post("/login", {
        email: form.email,
        senha: form.senha,
      });

      const { usuario, token } = response.data;
      setUser(usuario);
      setItem("token", token);
      navigate("/main");
    } catch (error) {
      return setErrorsAdvice({
        senha: error.response.data.mensagem,
        email: error.response.data.mensagem,
      });
    }
  }

  return (
    <div className="container__signIn">
      <div className="container__background">
        <p>Gerencie todos os pagamentos da sua empresa em um só lugar.</p>
      </div>

      <div className="container">
        <h1>Faça seu login!</h1>
        <form className="form__login" onSubmit={handleSubmit}>
          <div className="container__inputLogin">
            <label htmlFor="email" className="form_login_label">
              E-mail
            </label>
            <input
              style={{ borderColor: errorsAdvice.email ? "red" : null }}
              id="email"
              className="form_login_input"
              type="text"
              name="email"
              placeholder="Digite seu e-mail"
              value={form.email}
              onChange={handleChangeInputValue}
            />
            {errorsAdvice.email && (
              <span className="errorInput">{errorsAdvice.email}</span>
            )}
          </div>
          <div className="container__inputLogin">
            <label htmlFor="password" className="form_login_label">
              Senha
              <Link to="#">
                <span>Esqueceu a senha?</span>
              </Link>
            </label>
            <input
              style={{ borderColor: errorsAdvice.senha ? "red" : null }}
              id="password"
              className="form_login_input"
              type="password"
              name="senha"
              placeholder="Digite sua senha"
              value={form.senha}
              onChange={handleChangeInputValue}
            />
            {errorsAdvice.senha && (
              <span className="errorInput">{errorsAdvice.senha}</span>
            )}
          </div>

          <div className="form__login__buttons">
            <button className="form_login_btn" type="submit">
              Entrar
            </button>

            <Link to="./SignUp" style={{ textDecoration: "none" }}>
              <p>
                Ainda não possui uma conta? <strong>Cadastre-se</strong>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
