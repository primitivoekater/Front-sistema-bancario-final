import IconClientSelected from "../../assets/homeIcons/icon-clients-pink.svg";
import IconClient from "../../assets/homeIcons/icon-clients.svg";
import IconChargeSelected from "../../assets/homeIcons/icon-cobranca-pink.svg";
import IconCharge from "../../assets/homeIcons/icon-cobranca.svg";
import IconHomeSelected from "../../assets/homeIcons/icon-home-pink.svg";
import IconHome from "../../assets/homeIcons/icon-home.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";

export default function NavBar({ page, setPage }) {
  const { setDetailClient, setNoGetAllClients, setNoGetAllCharges } =
    useGlobalContext();
  return (
    <aside className="navBar">
      <div
        className={
          page === "home" ? "navBar__link div-selected" : "navBar__link"
        }
        onClick={() => setPage("home")}
      >
        <img src={page === "home" ? IconHomeSelected : IconHome} alt="Home" />
        <span className={page === "home" ? "link-selected" : null}>Home</span>
      </div>

      <div
        className={
          page === "client" ? "navBar__link div-selected" : "navBar__link"
        }
        onClick={() => {
          setNoGetAllClients(false);
          setDetailClient(false);
          setPage("client");
        }}
      >
        <img
          src={page === "client" ? IconClientSelected : IconClient}
          alt="Clientes"
        />
        <span className={page === "client" ? "link-selected" : null}>
          Clientes
        </span>
      </div>

      <div
        className={
          page === "charge" ? "navBar__link div-selected" : "navBar__link"
        }
        onClick={() => {
          setNoGetAllCharges(false);
          setPage("charge");
        }}
      >
        <img
          src={page === "charge" ? IconChargeSelected : IconCharge}
          alt="Cobranças"
        />
        <span className={page === "charge" ? "link-selected" : null}>
          Cobranças
        </span>
      </div>
    </aside>
  );
}
