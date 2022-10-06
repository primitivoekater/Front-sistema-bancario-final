import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";
export default function Alerts({ setShowPopup }) {
  const { detailsPopup } = useGlobalContext();
  return (
    <div
      style={{ backgroundColor: detailsPopup.backgroundColor }}
      className="pageClient__popUp"
    >
      <div className="pageClient__popUp-text">
        <img src={detailsPopup.icon} alt="icone" />
        <p style={{ color: detailsPopup.color }}>{detailsPopup.message}</p>
      </div>
      <img
        style={{ cursor: "pointer" }}
        src={detailsPopup.closeIcon}
        alt="Fechar popup"
        onClick={() => setShowPopup(false)}
      />
    </div>
  );
}
