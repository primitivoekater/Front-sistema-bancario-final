import { useEffect, useState } from "react";
import IconEdit from "../../assets/clientsIcons/icon-edit.svg";
import IconSearch from "../../assets/clientsIcons/icon-search.svg";
import IconTableClient from "../../assets/clientsIcons/icon-tableClient.svg";
import IconClient from "../../assets/homeIcons/icon-clients.svg";
import IconErrorTable from "../../assets/icon-error-table.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import ColumnTableClient from "../ColumnTableClient";
import "./styles.css";

export default function PageClientMain({
  listClients,
  setIsModalClient,
  setInfosDetailClient,
}) {
  const [searchValue, setSearchValue] = useState("");
  const {
    setDetailClient,
    contentTableClient,
    setContentTableClient,
    noGetAllClients,
  } = useGlobalContext();
  const token = getItem("token");
  const [allClients, setAllClients] = useState([]);
  const [searchNull, setSearchNull] = useState(0);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    if (noGetAllClients) return;
    setContentTableClient(listClients);
    setAllClients(listClients);
  }, [listClients, noGetAllClients, setContentTableClient]);

  function handleChangeValue(event) {
    setSearchValue(event.target.value);
  }

  async function handleSearch(event) {
    if (event.code !== "Enter") return;
    if (!searchValue) {
      setSearchNull(200);
      setContentTableClient(allClients);
      return;
    }

    try {
      const response = await api.get(`/clientes?pesquisa=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContentTableClient(response.data);
      setSearchNull(response.status);
    } catch (error) {
      setSearchNull(error.response.status);
    }
  }

  function handleOrderName() {
    setOrder(!order);

    if (order) {
      contentTableClient.sort((a, b) => {
        if (a.nome > b.nome) return 1;
        if (a.nome < b.nome) return -1;
        return 0;
      });
    } else {
      contentTableClient.sort((a, b) => {
        if (a.nome > b.nome) return -1;
        if (a.nome < b.nome) return 1;
        return 0;
      });
    }
  }

  return (
    <>
      <header className="pageClient__header">
        <h3>Clientes</h3>
      </header>

      <div className="pageClient__subHeader">
        <div className="subHeader__titles">
          <img src={IconClient} alt="Clientes" />
          <h1>Clientes</h1>
        </div>
        <div className="subHeader__interactions">
          <button onClick={() => setIsModalClient(true)}>
            + Adicionar Cliente
          </button>
          <img src={IconEdit} alt="Configuração" />
          <input
            onChange={handleChangeValue}
            onKeyDown={handleSearch}
            placeholder="Pesquisar"
          />
          <img
            className="subHeader__iconSearch"
            src={IconSearch}
            alt="Pesquisar"
          />
        </div>
      </div>
      <div className="PageClient__table">
        <div className="pageClient__tableHeader">
          <ul>
            <li onClick={handleOrderName} className="tableHeader__container">
              <img src={IconTableClient} alt="Organizar Ordem Alfabética" />
              Cliente
            </li>
            <li>CPF</li>
            <li>E-mail</li>
            <li>Telefone</li>
            <li>Status</li>
            <li>Criar Cobrança</li>
          </ul>
        </div>
        {searchNull === 404 ? (
          <div className="tableCobranca__error">
            <img src={IconErrorTable} alt="Resultado não encontrado" />
          </div>
        ) : (
          contentTableClient.map((client) => {
            return (
              <ColumnTableClient
                key={client.id}
                client={client}
                setDetailClient={setDetailClient}
                setInfosDetailClient={setInfosDetailClient}
              />
            );
          })
        )}
      </div>
    </>
  );
}
