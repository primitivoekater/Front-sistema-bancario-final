import { useGlobalContext } from "../../hooks/useGlobalContext";
import DeleteIcon from "../../assets/cobranIcons/DeleteIcon.svg";
import EditIcon from "../../assets/cobranIcons/EditIcon.svg";
import { format } from "date-fns";
import "./styles.css";
export default function ColumnTableCobranca({ charge }) {
  const {
    setModalDetailCharge,
    setInfoChargeDetail,
    setModalDelCharge,
    setInfoChargeDel,
    setIsModalEditCabranca,
    setClientEditCharge,
    setDetailsCobranca,
  } = useGlobalContext();

  function handleOpenModalDetail() {
    setInfoChargeDetail(charge);
    setModalDetailCharge(true);
  }

  function handleEditCobranca() {
    setClientEditCharge(charge);
    setDetailsCobranca(charge);
    setIsModalEditCabranca(true);
  }

  function handleDelCharge() {
    setInfoChargeDel(charge);
    setModalDelCharge(true);
  }

  return (
    <div className="pageCobranca__tableColumn">
      <div onClick={handleOpenModalDetail} className="tableColumn__content">
        <span className="tableColumnCobranca__text table__Name">
          {charge.nome_cliente}
        </span>
        <span className="tableColumnCobranca__text tableId">{charge.id}</span>
        <span className="tableColumnCobranca__text table__Valor">
          R$ {charge.valor.replace(".", ",")}
        </span>
        <span className="tableColumnCobranca__text table__Data">
          {format(new Date(charge.vencimento), "dd/MM/yyyy")}
        </span>
        <span
          className={
            charge.status === "Paga"
              ? "tableColumnCobranca__status stts-Pago table___status__Pago"
              : charge.status === "Vencida"
              ? "tableColumnCobranca__status stts-Vencida table__status__vencida"
              : "tableColumnCobranca__status stts-Pendente table__status__pendente"
          }
        >
          {charge.status}
        </span>
        <span className="tableColumnCobranca__text table__Descricao">
          {charge.descricao}
        </span>
      </div>
      <div
        style={{ marginLeft: charge.status === "Paga" && "10px" }}
        className="buttons__Icons"
      >
        <img
          className="btn__edit"
          src={EditIcon}
          alt="Editar"
          onClick={handleEditCobranca}
        />
        <img
          className="btn__delete"
          src={DeleteIcon}
          alt="Excluir"
          onClick={handleDelCharge}
        />
      </div>
    </div>
  );
}
