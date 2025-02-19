import { useNavigate } from "react-router-dom";
import "./SubPlan.css";

interface SubPlan {
  title: string; 
  description: string;
  price: number;
}

function SubPlan(props: SubPlan) {
  const { title, description, price } = props;
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div onClick={goToLogin} className="subplan-container">
        <div className="subplan-title"><strong>{title}</strong></div>
        <div className="subplan-text">{description}</div>
        <div className="subplan-price"><strong>Precio:{price}€</strong></div>
      </div>
    </>
  );
}

export default SubPlan;
