import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";
export default function CardClients({ clients, card, setPage }) {
  const { setContentTableClient, setNoGetAllClients } = useGlobalContext();
  const clientsLocal = [];
  for (let client of clients) {
    clientsLocal.push(client);
    if (clientsLocal.length === 4) break;
  }

  function handleShowMore() {
    setContentTableClient(clients);
    setNoGetAllClients(true);
    setPage("client");
  }

  return (
    <>
      <div className="card__clients" key={card.title}>
        <div className="client__header">
          <div className="client__text">
            <img src={card.icon} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
          <span
            style={{
              color: card.numberColor,
              backgroundColor: card.numberBackground,
            }}
          >
            {clients.length < 10 ? `0${clients.length}` : clients.length}
          </span>
        </div>
        <div className="client__table">
          <h3>Cliente</h3>
          <h3>ID do Clie.</h3>
          <h3>CPF</h3>
        </div>
        {clientsLocal.map((client) => {
          return (
            <div key={client.id} className="client__content">
              <span>{client.nome}</span>
              <span className="client__content-id">{client.id}</span>
              <span>{client.cpf}</span>
            </div>
          );
        })}
        <div className="client__footer">
          <p onClick={handleShowMore}>Ver todos</p>
        </div>
      </div>
    </>
  );
}
