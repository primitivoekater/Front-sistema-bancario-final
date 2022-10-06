import { format } from "date-fns";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import IconClose from "../../assets/clientsIcons/icon-close-sucessPopup.svg";
import IconSucess from "../../assets/clientsIcons/icon-sucessPopup.svg";
import IconCharge from "../../assets/cobranIcons/HeaderIcon.svg";
import Close from "../../assets/ModalIcons/close.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalEditCharge() {
  const {
    setDetailsPopup,
    setShowPopup,
    setIsModalEditCabranca,
    detailsCobranca,
  } = useGlobalContext();
  const token = getItem("token");

  const [form, setForm] = useState({
    name: detailsCobranca.nome_cliente,
    description: detailsCobranca.descricao,
    date: format(new Date(detailsCobranca.vencimento), "dd/MM/yyyy"),
    value: detailsCobranca.valor,
    status: detailsCobranca.status,
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
    if (form.date < 10) {
      return setErrorsAdvice({ date: "Data de validade incorreta" });
    }

    const ano = form.date.slice(6);
    const mes = form.date.slice(3, 5);
    const dia = form.date.slice(0, 2);

    if (dia > 32 || mes > 13) {
      return setErrorsAdvice({ date: "Data de validade incorreta" });
    }

    const data = {
      descricao: form.description,
      status: form.status,
      valor: form.value,
      vencimento: new Date(Number(ano), Number(mes) - 1, Number(dia)),
    };
    try {
      await api.put(`/cobranca/${detailsCobranca.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDetailsPopup({
        icon: IconSucess,
        message: "Cobrança editada com sucesso!",
        color: "#243F80",
        backgroundColor: "#C3D4FE",
        closeIcon: IconClose,
      });
      setShowPopup(true);
      setIsModalEditCabranca(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal">
      <div className="container__modal__editCharge">
        <img
          className="editCharge__closeIcon"
          src={Close}
          onClick={() => setIsModalEditCabranca(false)}
          alt="Fechar modal"
        />

        <div className="editCharge__header">
          <img src={IconCharge} alt="Icone" />
          <h2>Edição de Cobrança</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container__form-input__edit">
            <label>Nome*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChangeInputValue}
              readOnly
            />
          </div>
          <div className="container__form-input__edit">
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

          <div className="container__form-div__edit">
            <div className="container__form-input__edit">
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
            <div className="container__form-input__edit">
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
          <div className="container__form-checkbox__edit">
            <input
              id="radioPaga"
              type="radio"
              value="Paga"
              name="status"
              checked={form.status === "Paga" && true}
              onChange={handleChangeInputValue}
            />
            <label htmlFor="radioPaga">Cobrança Paga</label>
          </div>
          <div className="container__form-checkbox__edit">
            <input
              id="radioPendente"
              type="radio"
              value="Pendente"
              checked={
                form.status === "Pendente"
                  ? true
                  : form.status === "Vencida" && true
              }
              name="status"
              onChange={handleChangeInputValue}
            />
            <label htmlFor="radioPendente">Cobrança Pendente</label>
          </div>
          {errorsAdvice.status && (
            <span className="errorInput">{errorsAdvice.status}</span>
          )}

          <div className="form__group__btn group__btn-editcharge">
            <div className="form__left__btn">
              <button
                className="btn__modal__cancelar"
                type="button"
                onClick={() => setIsModalEditCabranca(false)}
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
