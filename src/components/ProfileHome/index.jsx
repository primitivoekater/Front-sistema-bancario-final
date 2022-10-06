import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconArrow from "../../assets/homeIcons/icon-arrow.svg";
import IconEditProfile from "../../assets/homeIcons/icon-editProfile.svg";
import IconExit from "../../assets/homeIcons/icon-exit.svg";
import IconPerson from "../../assets/homeIcons/icon-person.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { delItem, getItem } from "../../utils/storage";
import "./styles.css";

export default function Profile({ isModal, setIsModal }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { user, setUser } = useGlobalContext();
  const token = getItem("token");

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get("/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {}
    }
    getProfile();
  }, [isModal, setUser, token]);

  function handleExit() {
    delItem("token");
    navigate("/");
  }
  return (
    <>
      <div className="container__profile">
        <img className="profile__photo" src={IconPerson} alt="Foto de perfil" />
        <span className="profile__username">{user.nome}</span>
        <img
          style={{ cursor: "pointer" }}
          src={IconArrow}
          alt="Abrir menu"
          onClick={() => setShowPopup(!showPopup)}
        />
      </div>
      {showPopup && (
        <div className="modal__profile">
          <img
            onClick={() => setIsModal(true)}
            src={IconEditProfile}
            alt="Editar Perfil"
          />
          <img onClick={handleExit} src={IconExit} alt="Sair" />
        </div>
      )}
    </>
  );
}
