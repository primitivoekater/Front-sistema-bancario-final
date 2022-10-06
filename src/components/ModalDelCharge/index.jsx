import IconCloseError from "../../assets/clientsIcons/icon-close-errorPopup.svg";
import IconCloseSucess from "../../assets/clientsIcons/icon-close-sucessPopup.svg";
import IconError from "../../assets/clientsIcons/icon-errorPopup.svg";
import IconSucess from "../../assets/clientsIcons/icon-sucessPopup.svg";
import Close from "../../assets/ModalIcons/close.svg";
import IconDel from "../../assets/ModalIcons/icon-del-charge.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import "./styles.css";

export default function ModalDelCharge() {
  const { infoChargeDel, setModalDelCharge, setDetailsPopup, setShowPopup } =
    useGlobalContext();
  const token = getItem("token");
  function handleCloseModal() {
    setModalDelCharge(false);
  }

  async function handleDelCharge() {
    if (infoChargeDel.status === "Paga" || infoChargeDel.status === "Vencida") {
      setDetailsPopup({
        icon: IconError,
        message: "Esta cobrança não pode ser excluída!",
        color: "#AE1100",
        backgroundColor: "#F2D6D0",
        closeIcon: IconCloseError,
      });
    } else {
      try {
        await api.delete(`/cobranca/${infoChargeDel.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }
      setDetailsPopup({
        icon: IconSucess,
        message: "Cobrança excluída com sucesso!",
        color: "#243F80",
        backgroundColor: "#C3D4FE",
        closeIcon: IconCloseSucess,
      });
    }
    setShowPopup(true);
    setModalDelCharge(false);
  }

  return (
    <div className="modal">
      <div className="container__modal__delCharge">
        <img
          className="addCharge__closeIcon"
          src={Close}
          onClick={handleCloseModal}
          alt="Fechar modal"
        />
        <img src={IconDel} alt="Alerta" />
        <h2>Tem certeza que deseja excluir esta cobrança?</h2>
        <div className="delCharge__btns">
          <button className="delCharge__btn-cancel" onClick={handleCloseModal}>
            Não
          </button>
          <button className="delCharge__btn-yes" onClick={handleDelCharge}>
            Sim
          </button>
        </div>
      </div>
    </div>
  );
}
