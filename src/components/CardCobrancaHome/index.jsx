import { useGlobalContext } from "../../hooks/useGlobalContext";
import "./styles.css";

export default function Card({ charges, cardsDetails, setPage }) {
  const { setContentTableCharge, setNoGetAllCharges } = useGlobalContext();
  if (!charges) return;
  const chargeLocal = [];
  for (let charge of charges) {
    chargeLocal.push(charge);
    if (chargeLocal.length === 4) break;
  }

  function handleShowMore() {
    setContentTableCharge(charges);
    setNoGetAllCharges(true);
    setPage("charge");
  }

  return (
    <>
      <div className="card" key={cardsDetails.resumeTitle}>
        <div
          style={{ backgroundColor: cardsDetails.background }}
          className="card__resume"
        >
          <img src={cardsDetails.icon} alt={cardsDetails.resumeTitle} />
          <div className="resume__text">
            <h3 className="resume__title">{cardsDetails.resumeTitle}</h3>
            <h2 className="resume__value">
              R${" "}
              {cardsDetails.sum ? cardsDetails.sum.replace(".", ",") : "00,00"}
            </h2>
          </div>
        </div>

        <div className="card__details">
          <div className="details__title">
            <h3 className="resume__title">{cardsDetails.detailTitle}</h3>
            <span
              style={{
                color: cardsDetails.numberColor,
                backgroundColor: cardsDetails.numberBackground,
              }}
            >
              {charges.length < 10 ? `0${charges.length}` : charges.length}
            </span>
          </div>
          <div className="details__table">
            <h3>Cliente</h3>
            <h3>ID da cob.</h3>
            <h3>Valor</h3>
          </div>
          {chargeLocal.map((charge) => {
            return (
              <div key={charge.id} className="details__content">
                <span>{charge.nome_cliente}</span>
                <span className="details__content-id">{charge.id}</span>
                <span>R$ {charge.valor.replace(".", ",")}</span>
              </div>
            );
          })}
          <div className="details__footer">
            <p onClick={handleShowMore}>Ver todos</p>
          </div>
        </div>
      </div>
    </>
  );
}
