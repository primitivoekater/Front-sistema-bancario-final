import { useEffect, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import PageClientDetail from "../PageClientDetail";
import PageClientMain from "../PageClientMain";
import "./styles.css";

export default function ContentClient({ setIsModalClient, isModalClient }) {
  const [listClients, setListClients] = useState([]);
  const [infosDetailClient, setInfosDetailClient] = useState({});
  const { detailClient, isModalCharge } = useGlobalContext();
  const token = getItem("token");
  useEffect(() => {
    async function handleGetClients() {
      try {
        const response = await api.get("/cliente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setListClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    handleGetClients();
  }, [isModalClient, token, isModalCharge, detailClient]);

  return (
    <>
      {!detailClient ? (
        <PageClientMain
          listClients={listClients}
          setIsModalClient={setIsModalClient}
          setInfosDetailClient={setInfosDetailClient}
        />
      ) : (
        <PageClientDetail infosDetailClient={infosDetailClient} />
      )}
    </>
  );
}
