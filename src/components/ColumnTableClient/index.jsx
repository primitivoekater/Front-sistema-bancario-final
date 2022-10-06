import IconCharge from "../../assets/clientsIcons/icon-tableCharges.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";

export default function ColumnTableClient({ client, setInfosDetailClient }) {
  const { setDetailClient, setIsModalCharge, setClientAddCharge } =
    useGlobalContext();
  function handleDetailClient() {
    setInfosDetailClient(client);
    setDetailClient(true);
  }
  function handleAddCharge() {
    setIsModalCharge(true);
    setClientAddCharge(client);
  }

  return (
    <div className="pageClient__tableColumn">
      <span onClick={handleDetailClient} className="tableColumn__text column__name">
        {client.nome}
      </span>
      <span className="tableColumn__text column__cpf">{client.cpf}</span>
      <span className="tableColumn__text table__email">{client.email}</span>
      <span className="tableColumn__text table__telefone">
        {client.telefone}
      </span>
      <span
        className={
          client.status === "Em dia"
            ? "tableColumn__status stts-emDia"
            : "tableColumn__status stts-inadimplente"
        }
      >
        {client.status}
      </span>

      <img
        style={{ cursor: "pointer" }}
        onClick={handleAddCharge}
        src={IconCharge}
        alt="Cobrança"
      />
    </div>
  );
}
