import { useEffect, useState } from "react";
import IconEdit from "../../assets/clientsIcons/icon-edit.svg";
import IconSearch from "../../assets/clientsIcons/icon-search.svg";
import IconTableClient from "../../assets/clientsIcons/icon-tableClient.svg";
import HeaderIcon from "../../assets/cobranIcons/HeaderIcon.svg";
import IconErrorTable from "../../assets/icon-error-table.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import ColumnTableCobran from "../ColumnTableCobran";
import "./styles.css";

export default function ContentCobranca() {
  const token = getItem("token");
  const [searchValue, setSearchValue] = useState("");
  const [searchNull, setSearchNull] = useState(0);
  const [allChanges, setAllChanges] = useState([]);
  const {
    contentTableCharge,
    setContentTableCharge,
    noGetAllCharges,
    modalDelCharge,
    isModalEditCabranca,
  } = useGlobalContext();
  const [order, setOrder] = useState(false);

  useEffect(() => {
    async function handleGetCharge() {
      if (noGetAllCharges) return;
      try {
        const response = await api.get("/cobranca", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllChanges(response.data);
        setContentTableCharge(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    handleGetCharge();
  }, [
    modalDelCharge,
    noGetAllCharges,
    setContentTableCharge,
    token,
    isModalEditCabranca,
  ]);

  async function handleChangeValue(event) {
    setSearchValue(event.target.value);
  }

  async function handleSearch(event) {
    if (event.code !== "Enter") return;
    if (!searchValue) {
      setSearchNull(200);
      setContentTableCharge(allChanges);
      return;
    }
    try {
      const response = await api.get(`/cobrancas?pesquisa=${searchValue}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchNull(response.status);
      setContentTableCharge(response.data);
    } catch (error) {
      setSearchNull(error.response.status);
    }
  }

  function handleOrderName() {
    setOrder(!order);
    if (order) {
      contentTableCharge.sort((a, b) => {
        if (a.nome_cliente > b.nome_cliente) return 1;
        if (a.nome_cliente < b.nome_cliente) return -1;
        return 0;
      });
    } else {
      contentTableCharge.sort((a, b) => {
        if (a.nome_cliente > b.nome_cliente) return -1;
        if (a.nome_cliente < b.nome_cliente) return 1;
        return 0;
      });
    }
  }

  function handleOrderId() {
    setOrder(!order);
    if (order) {
      contentTableCharge.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      contentTableCharge.sort((a, b) => {
        return b.id - a.id;
      });
    }
  }

  return (
    <>
      <header className="pageCobranca__header">
        <h3>Cobranças</h3>
      </header>

      <div className="pageCobranca__subHeader">
        <div className="subHeaderCobranca__titles">
          <img src={HeaderIcon} alt="Clientes" />
          <h1>Cobranças</h1>
        </div>
        <div className="subHeaderCobranca__interactions">
          <img src={IconEdit} alt="Configuração" />
          <input
            onChange={handleChangeValue}
            onKeyDown={handleSearch}
            placeholder="Pesquisar"
          />
          <img
            className="subHeaderCobranca__iconSearch"
            src={IconSearch}
            alt="Pesquisar"
          />
        </div>
      </div>
      <div className="PageCobranca__table">
        <div className="pageCobranca__tableHeader">
          <div
            onClick={handleOrderName}
            className="tableHeaderCobranca__container"
          >
            <img src={IconTableClient} alt="Organizar Ordem Alfabética" />
            <h3>Cliente</h3>
          </div>
          <div
            onClick={handleOrderId}
            className="tableHeaderCobranca__container"
          >
            <img src={IconTableClient} alt="Organizar Ordem Numérica" />
            <h3>ID Cob.</h3>
          </div>
          <h3>Valor</h3>
          <h3 id="Column__dataDeVenc">Data de venc.</h3>
          <h3>Status</h3>
          <h3>Descrição</h3>
        </div>
        {searchNull === 404 ? (
          <div className="tableCobranca__error">
            <img src={IconErrorTable} alt="Resultado não encontrado" />
          </div>
        ) : (
          contentTableCharge.map((charge) => {
            return (
              <ColumnTableCobran
                nome={charge.nome_cliente}
                key={charge.id}
                charge={charge}
              />
            );
          })
        )}
      </div>
    </>
  );
}
