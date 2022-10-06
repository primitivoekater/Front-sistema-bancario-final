import React from "react";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import Avatar from "../../assets/clientsIcons/inco-avatar.svg";
import Close from "../../assets/ModalIcons/close.svg";
import api from "../../services/api";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import IconSucess from "../../assets/clientsIcons/icon-sucessPopup.svg";
import IconClose from "../../assets/clientsIcons/icon-close-sucessPopup.svg";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalAddClient({ setIsModalClient }) {
  const { setShowPopup, setDetailsPopup } = useGlobalContext();
  const token = getItem("token");

  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    telefone: "",
    logradouro: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
  });
  const [errorsAdvice, setErrorsAdvice] = useState({
    name: "",
    email: "",
    cpf: "",
    telefone: "",
    logradouro: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const checkCEP = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...form,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            cep: data.cep,
          });
        })

        .catch((event) => console.log(event.message));
    }
  };

  function handleChangeInputValue(event) {
    const value = event.nativeEvent.data;
    if (event.target.name === "name" && value !== " " && Number(value)) return;
    if (event.target.name === "email" && value === " ") return;
    if (event.target.name === "uf") {
      event.target.value = event.target.value.toUpperCase();
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
      if (!form.cpf) {
        return setErrorsAdvice({
          cpf: "Este campo deve ser preenchido",
        });
      }
      if (!form.telefone) {
        return setErrorsAdvice({
          telefone: "Este campo deve ser preenchido",
        });
      }
      if (form.telefone.length < 14) {
        return setErrorsAdvice({
          telefone: "O número está incompleto.",
        });
      }
      if (form.cpf.length < 14) {
        return setErrorsAdvice({
          cpf: "O cpf está incompleto.",
        });
      }

      await api.post(
        "/cliente",
        {
          nome: form.name,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
          cep: form.cep,
          complemento: form.complemento,
          logradouro: form.logradouro,
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.uf,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetailsPopup({
        icon: IconSucess,
        message: "Cadastro concluído com sucesso",
        color: "#243F80",
        backgroundColor: "#C3D4FE",
        closeIcon: IconClose,
      });
      setShowPopup(true);
      setIsModalClient(false);
    } catch (error) {
      setErrorsAdvice({
        email: error.response.data.mensagem,
      });
    }
  }

  return (
    <>
      <div className="modal">
        <div className="container__modal__client">
          <button
            className="btn__close"
            onClick={() => setIsModalClient(false)}
          >
            <img src={Close} alt="Fechar" />
          </button>
          <div className="container__avatar">
            <img src={Avatar} alt="Avatar" />
            <h1>Cadastro do Cliente</h1>
          </div>
          <div className="content__modal__client">
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
              <div className="form__group">
                <div className="form__left">
                  <label htmlFor="">CPF*</label>
                  <IMaskInput
                    style={{ borderColor: errorsAdvice.cpf ? "red" : null }}
                    name="cpf"
                    mask="000.000.000-00"
                    placeholder="Digite o seu CPF"
                    value={form.cpf}
                    onChange={handleChangeInputValue}
                  />
                  {errorsAdvice.cpf && (
                    <span className="errorInput">{errorsAdvice.cpf}</span>
                  )}
                </div>
                <div className="form__right">
                  <label htmlFor="">Telefone*</label>
                  <IMaskInput
                    style={{
                      borderColor: errorsAdvice.telefone ? "red" : null,
                    }}
                    name="telefone"
                    mask="00 0 0000 0000"
                    placeholder="Digite o seu Telefone"
                    value={form.telefone}
                    onChange={handleChangeInputValue}
                  />
                  {errorsAdvice.telefone && (
                    <span className="errorInput">{errorsAdvice.telefone}</span>
                  )}
                </div>
              </div>
              <label>Endereço</label>
              <input
                type="text"
                name="logradouro"
                placeholder="Digite o endereço"
                value={form.logradouro}
                onChange={handleChangeInputValue}
              />
              <label>Complemento</label>
              <input
                type="text"
                name="complemento"
                placeholder="Digite o complemento"
                value={form.complemento}
                onChange={handleChangeInputValue}
              />
              <div className="form__group">
                <div className="form__left">
                  <label htmlFor="">CEP</label>
                  <IMaskInput
                    onBlur={checkCEP}
                    name="cep"
                    mask="00000-000"
                    placeholder="Digite o seu CEP"
                    value={form.cep}
                    onChange={handleChangeInputValue}
                  />
                </div>
                <div className="form__right">
                  <label htmlFor="">Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    placeholder="Digite o bairro"
                    value={form.bairro}
                    onChange={handleChangeInputValue}
                  />
                </div>
              </div>
              <div className="form__group">
                <div className="form__left__cidade">
                  <label htmlFor="">Cidade</label>
                  <input
                    name="cidade"
                    type="text"
                    placeholder="Digite a cidade"
                    value={form.cidade}
                    onChange={handleChangeInputValue}
                  />
                </div>
                <div className="form__right__uf">
                  <label htmlFor="">UF</label>
                  <IMaskInput
                    mask="aa"
                    type="text"
                    name="estado"
                    placeholder="Digite a UF"
                    value={form.estado}
                    onChange={handleChangeInputValue}
                  />
                </div>
              </div>
              <div className="form__group__btn">
                <div className="form__left__btn">
                  <button
                    className="btn__modal__cancelar"
                    type="button"
                    onClick={() => setIsModalClient(false)}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="form__right__btn">
                  <button className="btn__modal__aplicar" type="submit">
                    Aplicar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
