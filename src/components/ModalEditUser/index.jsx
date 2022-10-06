import { useState } from "react";
import { IMaskInput } from "react-imask";
import Close from "../../assets/ModalIcons/close.svg";
import EyeClose from "../../assets/SignUpIcons/eye-close.svg";
import EyeOpen from "../../assets/SignUpIcons/eye-open.svg";
import IconSucess from "../../assets/SignUpIcons/icon-sucess.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function Modal({ setIsModal }) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { user } = useGlobalContext();
  const token = getItem("token");

  const [form, setForm] = useState({
    name: user.nome,
    email: user.email,
    cpf: user.cpf,
    telefone: user.telefone,
    senha: "",
    confirmarSenha: "",
  });
  const [errorsAdvice, setErrorsAdvice] = useState({
    name: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });

  function handleChangeInputValue(event) {
    const value = event.nativeEvent.data;
    if (event.target.name === "name" && value !== " " && Number(value)) return;
    if (event.target.name === "email" || event.target.name === "senha") {
      if (value === " ") return;
    }
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.name) {
        return setErrorsAdvice({
          name: "Este campo deve ser preenchido",
        });
      }
      if (!form.email) {
        return setErrorsAdvice({
          email: "Este campo deve ser preenchido",
        });
      }
      if (form.senha && !form.confirmarSenha) {
        return setErrorsAdvice({
          confirmarSenha: "Este campo deve ser preenchido",
        });
      }
      if (form.senha !== form.confirmarSenha) {
        return setErrorsAdvice({
          senha: "As senhas não coincidem.",
          confirmarSenha: "As senhas não coincidem.",
        });
      }
      const data = {
        nome: form.name,
        email: form.email,
        cpf: form.cpf,
        telefone: form.telefone,
      };

      if (form.senha === form.confirmarSenha && form.senha) {
        if (form.senha.length < 8 || form.confirmarSenha.length < 8) {
          return setErrorsAdvice({
            senha: "As senhas devem ter no mínimo 8 dígitos.",
            confirmarSenha: "As senhas devem ter no mínimo 8 dígitos.",
          });
        }
        await api.put(
          "/usuario",
          { ...data, senha: form.senha },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await api.put("/usuario", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setConfirmed(true);
      setTimeout(() => {
        setConfirmed(false);
        setIsModal(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="modal">
        {!confirmed ? (
          <>
            <div className="container__modal">
              <button className="btn__close" onClick={() => setIsModal(false)}>
                <img src={Close} alt="Fechar" />
              </button>
              <h1>Edite seu cadastro</h1>
              <div className="content__modal">
                <form onSubmit={handleSubmit}>
                  <label>Nome*</label>
                  <input
                    style={{ borderColor: errorsAdvice.name ? "red" : null }}
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    value={form.name}
                    onChange={handleChangeInputValue}
                  />
                  {errorsAdvice.name && (
                    <span className="errorInput">{errorsAdvice.name}</span>
                  )}
                  <label>E-mail*</label>
                  <input
                    style={{ borderColor: errorsAdvice.email ? "red" : null }}
                    type="text"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={form.email}
                    onChange={handleChangeInputValue}
                  />
                  {errorsAdvice.email && (
                    <span className="errorInput">{errorsAdvice.email}</span>
                  )}
                  <div className="formEdit__group">
                    <div className="formEdit__left">
                      <label htmlFor="">CPF</label>
                      <IMaskInput
                        name="cpf"
                        mask="000.000.000-00"
                        placeholder="Digite o seu CPF"
                        value={form.cpf}
                        onChange={handleChangeInputValue}
                      />
                    </div>
                    <div className="formEdit__right">
                      <label htmlFor="">Telefone</label>
                      <IMaskInput
                        name="telefone"
                        mask="00 0 0000 0000"
                        placeholder="Digite o seu Telefone"
                        value={form.telefone}
                        onChange={handleChangeInputValue}
                      />
                    </div>
                  </div>
                  <div className="container__inputEdit">
                    <label>Nova Senha*</label>
                    <input
                      style={{ borderColor: errorsAdvice.senha ? "red" : null }}
                      type={showPass ? "text" : "password"}
                      name="senha"
                      placeholder="••••••••"
                      value={form.senha}
                      onChange={handleChangeInputValue}
                    />
                    {errorsAdvice.senha && (
                      <span className="errorInput">{errorsAdvice.senha}</span>
                    )}
                    <img
                      className="eyeIconEdit"
                      src={showPass ? EyeOpen : EyeClose}
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                      alt="Mostrar a senha"
                    />
                  </div>
                  <div className="container__inputEdit">
                    <label>Comfirmar Senha*</label>
                    <input
                      style={{
                        borderColor: errorsAdvice.confirmarSenha ? "red" : null,
                      }}
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmarSenha"
                      placeholder="••••••••"
                      value={form.confirmarSenha}
                      onChange={handleChangeInputValue}
                    />
                    {errorsAdvice.confirmarSenha && (
                      <span className="errorInput">
                        {errorsAdvice.confirmarSenha}
                      </span>
                    )}
                    <img
                      className="eyeIconEdit"
                      src={showConfirmPass ? EyeOpen : EyeClose}
                      onClick={() => {
                        setShowConfirmPass(!showConfirmPass);
                      }}
                      alt="Mostrar a senha"
                    />
                  </div>
                  <button className="btn__modal" type="submit">
                    Aplicar
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="container__modal__confirmed">
            <div className="content__modal__confirmed">
              <img src={IconSucess} alt="Cadastro feito com sucesso!" />
              <h1>Cadastro Alterado com sucesso!</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
