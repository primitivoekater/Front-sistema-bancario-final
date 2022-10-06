import { useState, useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export function useGlobalProvider() {
  const [showPopup, setShowPopup] = useState(false);
  const [detailClient, setDetailClient] = useState(false);
  const [isModalCharge, setIsModalCharge] = useState(false);
  const [isModalEditCabranca, setIsModalEditCabranca] = useState(false);
  const [clientAddCharge, setClientAddCharge] = useState({});
  const [clientEditCobranca, setClientEditCobranca] = useState({});
  const [clientEditCharge, setClientEditCharge] = useState({});
  const [detailsPopup, setDetailsPopup] = useState({});
  const [detailsCobranca, setDetailsCobranca] = useState({});
  const [user, setUser] = useState({});
  const [modalDetailCharge, setModalDetailCharge] = useState(false);
  const [infoChargeDetail, setInfoChargeDetail] = useState({});
  const [modalDelCharge, setModalDelCharge] = useState(false);
  const [infoChargeDel, setInfoChargeDel] = useState(false);
  const [clientsIna, setClientsIna] = useState([]);
  const [clientsDia, setClientsDia] = useState([]);
  const [contentTableCharge, setContentTableCharge] = useState([]);
  const [contentTableClient, setContentTableClient] = useState([]);
  const [noGetAllClients, setNoGetAllClients] = useState(false);
  const [chargesPaid, setChargesPaid] = useState({});
  const [chargesPending, setChargesPending] = useState({});
  const [chargesOverdue, setChargesOverdue] = useState({});
  const [noGetAllCharges, setNoGetAllCharges] = useState({});

  return {
    showPopup,
    setShowPopup,
    detailClient,
    setDetailClient,
    isModalCharge,
    setIsModalCharge,
    clientAddCharge,
    setClientAddCharge,
    clientEditCharge,
    setClientEditCharge,
    isModalEditCabranca, 
    setIsModalEditCabranca,
    clientEditCobranca,
    setClientEditCobranca,
    detailsPopup,
    setDetailsPopup,
    user,
    setUser,
    modalDetailCharge,
    setModalDetailCharge,
    infoChargeDetail,
    setInfoChargeDetail,
    modalDelCharge,
    setModalDelCharge,
    infoChargeDel,
    setInfoChargeDel,
    clientsIna,
    setClientsIna,
    clientsDia,
    setClientsDia,
    contentTableCharge,
    setContentTableCharge,
    contentTableClient,
    setContentTableClient,
    noGetAllClients,
    setNoGetAllClients,
    chargesPaid,
    setChargesPaid,
    chargesPending,
    setChargesPending,
    chargesOverdue,
    setChargesOverdue,
    noGetAllCharges,
    setNoGetAllCharges,
    detailsCobranca, 
    setDetailsCobranca
  };
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
