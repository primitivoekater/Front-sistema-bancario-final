import { useState } from "react";
import Alerts from "../../components/Alerts";
import ContentCharge from "../../components/ContentsChargeMain";
import ContentClient from "../../components/ContentsClientMain";
import ContentHome from "../../components/ContentsHomeMain";
import ModalAddCharge from "../../components/ModalAddCharge";
import ModalAddClient from "../../components/ModalAddClient";
import ModalDelCharge from "../../components/ModalDelCharge";
import ModalDetailCharge from "../../components/ModalDetailCharge";
import ModalEditCharge from "../../components/ModalEditCharge";
import ModalEditUser from "../../components/ModalEditUser";
import NavBar from "../../components/NavBarHome";
import Profile from "../../components/ProfileHome";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";

function Main() {
  const [page, setPage] = useState("home");
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalClient, setIsModalClient] = useState(false);
  const {
    isModalCharge,
    showPopup,
    setShowPopup,
    modalDetailCharge,
    modalDelCharge,
    isModalEditCabranca,
  } = useGlobalContext();
  return (
    <div className="container__main">
      <NavBar page={page} setPage={setPage} />
      <main>
        <Profile isModal={isModalEdit} setIsModal={setIsModalEdit} />

        {page === "home" && <ContentHome setPage={setPage} />}

        {page === "client" && (
          <ContentClient
            setIsModalClient={setIsModalClient}
            isModalClient={isModalClient}
          />
        )}
        {page === "charge" && <ContentCharge />}
      </main>
      {isModalClient && <ModalAddClient setIsModalClient={setIsModalClient} />}
      {isModalEdit && <ModalEditUser setIsModal={setIsModalEdit} />}
      {isModalCharge && <ModalAddCharge />}
      {isModalEditCabranca && <ModalEditCharge />}
      {showPopup && <Alerts setShowPopup={setShowPopup} />}
      {modalDetailCharge && <ModalDetailCharge />}
      {modalDelCharge && <ModalDelCharge />}
    </div>
  );
}

export default Main;
