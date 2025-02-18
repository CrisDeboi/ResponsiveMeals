import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import SubPlan from "../../components/SubPlan/SubPlan";
import "./Subscription.css";

function Subscription() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="subscription-subtitle">
          <strong>Elige el plan que mejor se adapte a tus necesidades</strong>
        </div>
        <div className="subplans-container">
          <SubPlan
            title="Estándar"
            price={99.95}
            description="Suscripción estándar que cubre gastos de envío y hasta 50 platos a elegir entre la rotación de cada mes"
          />
          <SubPlan
            title="Premium"
            price={149.95}
            description="Suscripción completa que incluye gastos de envío y hasta 60 platos entre cualquiera de los que hay en la aplicación"
          />
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Subscription;
