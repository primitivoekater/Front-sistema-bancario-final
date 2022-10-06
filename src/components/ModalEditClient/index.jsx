import React, { useEffect, useState } from "react";
import { IMaskInput } from "react-imask";
import IconClose from "../../assets/clientsIcons/icon-close-sucessPopup.svg";
import IconSucess from "../../assets/clientsIcons/icon-sucessPopup.svg";
import Avatar from "../../assets/clientsIcons/inco-avatar.svg";
import Close from "../../assets/ModalIcons/close.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalEditClient({
  isModalEditClient,
  setIsModalEditClient,
  idClient,
}) {
  const token = getItem("token");
  const { setShowPopup, setDetailsPopup } = useGlobalContext();
  const [form, setForm] = useState({
    nome: "",
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
    nome: "",
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

  useEffect(() => {
    async function getEditClient() {
      const response = await api.get(`/cliente/${idClient}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm(response.data);
    }
    getEditClient();
  }, [idClient, token]);

  if (!isModalEditClient) {
    return null;
  }

  function handleChangeInputValue(event) {
    if (event.target.name === "email" && event.nativeEvent.data === " ") return;
    setForm({ ...form, [event.target.name]: event.target.value });
  }
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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!form.nome) {
        return setErrorsAdvice({
          nome: "Este campo deve ser preenchido",
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

      await api.put(
        `/cliente/${idClient}`,
        {
          nome: form.nome,
          email: form.email,
          cpf: form.cpf,
          telefone: form.telefone,
          cep: form.cep,
          logradouro: form.logradouro,
          complemento: form.complemento,
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.estado,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDetailsPopup({
        icon: IconSucess,
        message: "Edição do cadastro concluídas com sucesso",
        color: "#243F80",
        backgroundColor: "#C3D4FE",
        closeIcon: IconClose,
      });
      setShowPopup(true);
      setIsModalEditClient(false);
    } catch (error) {
      setErrorsAdvice({
        email: error.response.data.mensagem,
      });
    }
  }
  return (
    <>
      <div className="modal">
        <div className="container__modal__client__Edit">
          <button
            className="btn__close"
            onClick={() => setIsModalEditClient(false)}
          >
            <img src={Close} alt="Fechar" />
          </button>
          <div className="container__avatar__Edit">
            <img src={Avatar} alt="Avatar" />
            <h1>Editar Cliente</h1>
          </div>
          <div className="content__modal__client">
            <form onSubmit={handleSubmit}>
              <label>Nome*</label>
              <input
                style={{ borderColor: errorsAdvice.nome ? "red" : null }}
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                value={form.nome}
                onChange={handleChangeInputValue}
              />
              {errorsAdvice.name && (
                <span className="errorInput">{errorsAdvice.nome}</span>
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
                  <input
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
                    type=""
                    onClick={() => setIsModalEditClient(false)}
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
