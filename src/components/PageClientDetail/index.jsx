import { useEffect, useState } from "react";
import IconTableClient from "../../assets/clientsIcons/icon-tableClient.svg";
import IconEditClient from "../../assets/detailClientsIcons/icon-editClient.svg";
import IconClient from "../../assets/homeIcons/icon-clients.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import ColumnTableDetailClient from "../ColumnTableDetailClient";
import ModalEditClient from "../ModalEditClient";
import "./styles.css";

export default function PageClientDetail({ infosDetailClient }) {
  const [listCharge, setListCharge] = useState([]);
  const token = getItem("token");
  const {
    setDetailClient,
    isModalCharge,
    setIsModalCharge,
    setClientAddCharge,
    isModalEditCabranca,
  } = useGlobalContext();
  const [isModalEditClient, setIsModalEditClient] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [order, setOrder] = useState(false);
  function closeModalEdit() {
    setIsModalEditClient(false);
  }

  useEffect(() => {
    async function getEditClient() {
      const response = await api.get(`/cliente/${infosDetailClient.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserEdit(response.data);
    }
    getEditClient();
  }, [infosDetailClient.id, isModalEditClient, token]);

  const contentCardDetails = [
    {
      id: 0,
      title: "E-mail",
      description: userEdit.email,
    },
    {
      id: 1,
      title: "Telefone",
      description: userEdit.telefone,
    },
    {
      id: 2,
      title: "CPF",
      description: userEdit.cpf,
    },
    {
      id: 3,
      title: "Endereço",
      description: userEdit.logradouro,
    },
    {
      id: 4,
      title: "Bairro",
      description: userEdit.bairro,
    },
    {
      id: 5,
      title: "Complemento",
      description: userEdit.complemento,
    },
    {
      id: 6,
      title: "CEP",
      description: userEdit.cep,
    },
    {
      id: 7,
      title: "Cidade",
      description: userEdit.cidade,
    },
    {
      id: 8,
      title: "UF",
      description: userEdit.estado,
    },
  ];

  useEffect(() => {
    async function handleGetCharges() {
      const response = await api.get(`/cobrancas/${infosDetailClient.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListCharge(response.data);
    }
    handleGetCharges();
  }, [infosDetailClient.id, isModalCharge, token, isModalEditCabranca]);

  function handleAddCharge() {
    setIsModalCharge(true);
    setClientAddCharge(infosDetailClient);
  }

  function handleOrderId() {
    setOrder(!order);
    if (order) {
      listCharge.sort((a, b) => {
        return a.id - b.id;
      });
    } else {
      listCharge.sort((a, b) => {
        return b.id - a.id;
      });
    }
  }

  function handleOrderDate() {
    setOrder(!order);
    if (order) {
      listCharge.sort((a, b) => {
        return +new Date(a.vencimento) - +new Date(b.vencimento);
      });
    } else {
      listCharge.sort((a, b) => {
        return +new Date(b.vencimento) - +new Date(a.vencimento);
      });
    }
  }

  return (
    <>
      <header className="detailClient__header">
        <h3
          onClick={() => setDetailClient(false)}
          className="detailClient__header-title"
        >
          Clientes
        </h3>
        <h3 className="detailClient__header-subtitle">
          {">"} Detalhes do cliente
        </h3>
      </header>
      <div className="subHeader__titles">
        <img src={IconClient} alt="Cliente" />
        <h1>{userEdit.nome}</h1>
      </div>

      <div className="detailClient__card-detail">
        <div className="containerCardDetail__header">
          <h3>Dados do cliente</h3>
          <button onClick={() => setIsModalEditClient(true)}>
            <img src={IconEditClient} alt="Editar Cliente" /> Editar Cliente
          </button>
        </div>
        <div className="containerCardDetail__content">
          {contentCardDetails.map((content) => {
            return (
              <div
                key={content.id}
                style={{ marginRight: content.title === "CPF" && "400px" }}
              >
                <p>{content.title}</p>
                <span>{content.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="detailClient__card-charges">
        <div className="containerCardCharges__header">
          <h3>Cobranças do cliente</h3>
          <button onClick={handleAddCharge}>+ Nova cobrança</button>
        </div>
        <div className="tableHeader__detailClient">
          <div onClick={handleOrderId} className="tableHeader__container">
            <img src={IconTableClient} alt="Organizar Ordem" />
            <h3>ID Cob.</h3>
          </div>
          <div onClick={handleOrderDate} className="tableHeader__container">
            <img src={IconTableClient} alt="Organizar Ordem" />
            <h3>Data de venc.</h3>
          </div>
          <h3>Valor</h3>
          <h3>Status</h3>
          <h3>Descrição</h3>
        </div>
        {listCharge.map((charge) => {
          return <ColumnTableDetailClient key={charge.id} charge={charge} />;
        })}
      </div>
      <ModalEditClient
        isModalEditClient={isModalEditClient}
        setIsModalEditClient={closeModalEdit}
        idClient={infosDetailClient.id}
      />
    </>
  );
}
