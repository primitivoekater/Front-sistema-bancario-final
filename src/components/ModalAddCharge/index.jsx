import React from "react";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import IconCharge from "../../assets/cobranIcons/HeaderIcon.svg";
import Close from "../../assets/ModalIcons/close.svg";
import api from "../../services/api";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import IconSucess from "../../assets/clientsIcons/icon-sucessPopup.svg";
import IconClose from "../../assets/clientsIcons/icon-close-sucessPopup.svg";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalAddCharge() {
  const { setDetailsPopup, setShowPopup, setIsModalCharge, clientAddCharge } =
    useGlobalContext();
  const token = getItem("token");
  const [form, setForm] = useState({
    name: clientAddCharge.nome,
    description: "",
    date: "",
    value: "",
    status: "",
  });
  const [errorsAdvice, setErrorsAdvice] = useState({
    description: "",
    date: "",
    value: "",
    status: "",
  });

  function handleChangeInputValue(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.description) {
      return setErrorsAdvice({ description: "Esse campo deve ser preenchido" });
    }
    if (!form.date) {
      return setErrorsAdvice({ date: "Esse campo deve ser preenchido" });
    }
    if (!form.value) {
      return setErrorsAdvice({ value: "Esse campo deve ser preenchido" });
    }
    if (!form.status) {
      return setErrorsAdvice({ status: "Esse campo deve ser preenchido" });
    }
    if (form.date.length < 10) {
      return setErrorsAdvice({ date: "Data de validade incorreta" });
    }

    const ano = form.date.slice(6);
    const mes = form.date.slice(3, 5);
    const dia = form.date.slice(0, 2);

    if (dia > 32 || mes > 13) {
      return setErrorsAdvice({ date: "Data de validade incorreta" });
    }

    const data = {
      cliente_id: clientAddCharge.id,
      descricao: form.description,
      status: form.status,
      valor: form.value,
      vencimento: new Date(Number(ano), Number(mes) - 1, Number(dia)),
    };
    try {
      await api.post("/cobranca", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetailsPopup({
        icon: IconSucess,
        message: "Cadastro concluído com sucesso",
        color: "#243F80",
        backgroundColor: "#C3D4FE",
        closeIcon: IconClose,
      });
      setShowPopup(true);
      setIsModalCharge(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal">
      <div className="container__modal__addCharge">
        <img
          className="addCharge__closeIcon"
          src={Close}
          onClick={() => setIsModalCharge(false)}
          alt="Fechar modal"
        />

        <div className="addCharge__header">
          <img src={IconCharge} alt="Icone" />
          <h2>Cadastro de Cobrança</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container__form-input">
            <label>Nome*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChangeInputValue}
              readOnly
            />
          </div>
          <div className="container__form-input">
            <label>Descrição*</label>
            <textarea
              style={{ borderColor: errorsAdvice.description ? "red" : null }}
              name="description"
              value={form.description}
              rows="5"
              cols="50"
              placeholder="Digite a descrição"
              onChange={handleChangeInputValue}
            />
            {errorsAdvice.description && (
              <span className="errorInput">{errorsAdvice.description}</span>
            )}
          </div>

          <div className="container__form-div">
            <div className="container__form-input">
              <label>Vencimento*</label>
              <IMaskInput
                style={{ borderColor: errorsAdvice.date ? "red" : null }}
                mask="00/00/0000"
                type="text"
                name="date"
                value={form.date}
                onChange={handleChangeInputValue}
                placeholder="Data de vencimento"
              />
              {errorsAdvice.date && (
                <span className="errorInput">{errorsAdvice.date}</span>
              )}
            </div>
            <div className="container__form-input">
              <label>Valor*</label>
              <input
                style={{ borderColor: errorsAdvice.value ? "red" : null }}
                type="number"
                name="value"
                value={form.value}
                onChange={handleChangeInputValue}
                placeholder="Digite o valor"
              />
              {errorsAdvice.value && (
                <span className="errorInput">{errorsAdvice.value}</span>
              )}
            </div>
          </div>
          <div className="container__form-checkbox">
            <input
              id="radioPaga"
              type="radio"
              value="Paga"
              name="status"
              onChange={handleChangeInputValue}
            />
            <label htmlFor="radioPaga">Cobrança Paga</label>
          </div>
          <div className="container__form-checkbox">
            <input
              id="radioPendente"
              type="radio"
              value="Pendente"
              name="status"
              onChange={handleChangeInputValue}
            />
            <label htmlFor="radioPendente">Cobrança Pendente</label>
          </div>
          {errorsAdvice.status && (
            <span className="errorInput">{errorsAdvice.status}</span>
          )}

          <div className="form__group__btn group__btn-addcharge">
            <div className="form__left__btn">
              <button
                className="btn__modal__cancelar"
                type="button"
                onClick={() => setIsModalCharge(false)}
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
  );
}
