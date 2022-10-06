import { useEffect } from "react";
import IconClientOk from "../../assets/homeIcons/cards/icon-clienteEmDia.svg";
import IconClientInadim from "../../assets/homeIcons/cards/icon-clienteInadimplente.svg";
import IconChargePaid from "../../assets/homeIcons/cards/icon-cobrancaPaga.svg";
import IconChargePending from "../../assets/homeIcons/cards/icon-cobrancaPendente.svg";
import IconChargeOverdue from "../../assets/homeIcons/cards/icon-cobrancaVencida.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import api from "../../services/api";
import { getItem } from "../../utils/storage";
import CardClients from "../CardClientsHome";
import CardCharge from "../CardCobrancaHome";
import "./styles.css";

export default function ContentHome({ setPage }) {
  const token = getItem("token");
  const {
    clientsIna,
    setClientsIna,
    clientsDia,
    setClientsDia,
    chargesPaid,
    setChargesPaid,
    chargesPending,
    setChargesPending,
    chargesOverdue,
    setChargesOverdue,
  } = useGlobalContext();
  useEffect(() => {
    async function getInfos() {
      const responseGetClients = await api.get("/clientesPorStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientsIna(responseGetClients.data.clientesInadimplentes);
      setClientsDia(responseGetClients.data.clientesEmDia);

      const responseGetCharges = await api.get("/cobrancasPorStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChargesPaid(responseGetCharges.data.cobrancasPagas);
      setChargesPending(responseGetCharges.data.cobrancasPrevistas);
      setChargesOverdue(responseGetCharges.data.cobrancasVencidas);
    }
    getInfos();
  }, [
    setChargesOverdue,
    setChargesPaid,
    setChargesPending,
    setClientsDia,
    setClientsIna,
    token,
  ]);

  return (
    <>
      <header className="home__header">
        <h1 className="home__title">Resumo das cobranças</h1>
      </header>
      <div className="container__cardsCobrancas">
        <CardCharge
          charges={chargesOverdue.cobrancas}
          cardsDetails={{
            background: "#FFEFEF",
            icon: IconChargeOverdue,
            resumeTitle: "Cobranças Vencidas",
            detailTitle: "Cobranças Vencidas",
            numberColor: "#971D1D",
            numberBackground: "#FFEFEF",
            sum: chargesOverdue.soma,
          }}
          setPage={setPage}
        />
        <CardCharge
          charges={chargesPending.cobrancas}
          cardsDetails={{
            background: "#FCF6DC",
            icon: IconChargePending,
            resumeTitle: "Cobranças Previstas",
            detailTitle: "Cobranças Previstas",
            numberColor: "#C5A605",
            numberBackground: "#FCF6DC",
            sum: chargesPending.soma,
          }}
          setPage={setPage}
        />
        <CardCharge
          charges={chargesPaid.cobrancas}
          cardsDetails={{
            background: "#EEF7F7",
            icon: IconChargePaid,
            resumeTitle: "Cobranças Pagas",
            detailTitle: "Cobranças Pagas",
            numberColor: "#1FA7AF",
            numberBackground: "#EEF7F7",
            sum: chargesPaid.soma,
          }}
          setPage={setPage}
        />
      </div>
      <div className="container__cardsClients">
        <CardClients
          clients={clientsIna}
          card={{
            icon: IconClientInadim,
            title: "Clientes Inadimplentes",
            numberColor: "#971D1D",
            numberBackground: "#FFEFEF",
          }}
          setPage={setPage}
        />
        <CardClients
          clients={clientsDia}
          card={{
            icon: IconClientOk,
            title: "Clientes em dia",
            numberColor: "#1FA7AF",
            numberBackground: "#EEF6F6",
          }}
          setPage={setPage}
        />
      </div>
    </>
  );
}
