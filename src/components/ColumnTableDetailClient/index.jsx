import { useGlobalContext } from "../../hooks/useGlobalContext";
import DeleteIcon from "../../assets/cobranIcons/DeleteIcon.svg";
import EditIcon from "../../assets/cobranIcons/EditIcon.svg";
import { format } from "date-fns";
import "./styles.css";
export default function ColumnTableDetailClient({ charge }) {
  const {
    setModalDelCharge,
    setInfoChargeDel,
    setIsModalEditCabranca,
    setClientEditCharge,
    setDetailsCobranca
  } = useGlobalContext();

  function handleDelCharge() {
    setInfoChargeDel(charge);
    setModalDelCharge(true);
  }

  function handleEditCobranca() {
    setIsModalEditCabranca(true);
    setDetailsCobranca(charge);
    setClientEditCharge(charge);
  }

  return (
    <div className="pageDetailClient__tableColumn ">
      <span className="tableDetailClient__text id__Detalhe__cliente">
        {charge.id}
      </span>
      <span className="tableDetailClient__text data__Detalhe__cliente">
        {format(new Date(charge.vencimento), "dd/MM/yyyy")}
      </span>
      <span className="tableDetailClient__text value__Detalhe__cliente">
        R$ {charge.valor.replace(".", ",")}
      </span>
      <span
        className={
          charge.status === "Paga"
            ? "tableColumnCobranca__status stts-Pago__Client status__Pago__Detalhe__Cliente"
            : charge.status === "Vencida"
            ? "tableColumnCobranca__status stts-Vencida__Client status__vencida__Detalhe__cliente"
            : "tableColumnCobranca__status stts-Pendente__Client status__pendente__Detalhe__cliente"
        }
      >
        {charge.status}
      </span>
      <span
        style={{ marginLeft: charge.status === "Paga" && "20px" }}
        className="tableDetailClient__text descricao__Detalhe__cliente"
      >
        {charge.descricao}
      </span>
      <div
        style={{ marginLeft: charge.status === "Paga" && "40px" }}
        className="btns__tableDetail"
      >
        <img
          className="btn__edit"
          src={EditIcon}
          alt="Editar"
          onClick={handleEditCobranca}
        />
        <img
          className="btn__delete"
          onClick={handleDelCharge}
          src={DeleteIcon}
          alt="Excluir"
        />
      </div>
    </div>
  );
}
