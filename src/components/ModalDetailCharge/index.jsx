import { format } from "date-fns";
import IconCharge from "../../assets/cobranIcons/HeaderIcon.svg";
import Close from "../../assets/ModalIcons/close.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";

export default function ModalDetailCharge() {
  const { infoChargeDetail, setModalDetailCharge } = useGlobalContext();
  return (
    <div className="modal">
      <div className="container__modal__detailCharge">
        <img
          className="addCharge__closeIcon"
          src={Close}
          onClick={() => setModalDetailCharge(false)}
          alt="Fechar modal"
        />
        <div className="detailCharge__header">
          <img src={IconCharge} alt="Icone" />
          <h2>Detalhe da Cobrança</h2>
        </div>
        <div className="detailCharge__container-name">
          <h4>Nome</h4>
          <span>{infoChargeDetail.nome_cliente}</span>
        </div>
        <div className="detailCharge__container-description">
          <h4>Descrição</h4>
          <span>{infoChargeDetail.descricao}</span>
        </div>
        <div className="detailCharge__container-flex">
          <div className="detailCharge__container-date">
            <h4>Vencimento</h4>
            <span>
              {format(new Date(infoChargeDetail.vencimento), "dd/MM/yyyy")}
            </span>
          </div>
          <div className="detailCharge__container-value">
            <h4>Valor</h4>
            <span>R$ {infoChargeDetail.valor.replace(".", ",")}</span>
          </div>
        </div>
        <div className="detailCharge__container-flex">
          <div className="detailCharge__container-id">
            <h4>ID cobranças</h4>
            <span>{infoChargeDetail.id}</span>
          </div>
          <div className="detailCharge__container-status">
            <h4>Status</h4>
            <span
              className={
                infoChargeDetail.status === "Paga"
                  ? " stts-Pago"
                  : infoChargeDetail.status === "Vencida"
                  ? "stts-Vencida"
                  : "stts-Pendente"
              }
            >
              {infoChargeDetail.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
