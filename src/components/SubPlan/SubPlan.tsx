import { useNavigate } from "react-router-dom";
import "./SubPlan.css";
import { getCurrentUser, getToken } from "../../services/AuthService";
import { useState } from "react";
// import { assignSubscription } from "../../services/Api";

interface SubPlan {
  title: string; 
  description: string;
  price: number;
  id: number;
}

function SubPlan(props: SubPlan) {
  const { title, description, price, id} = props;
  const navigate = useNavigate();  

  const assignSubscription = async (suscripcionId: number) => {
  const user = await getCurrentUser();
  if (!user) return navigate("/login");

  try {
    const response = await fetch(
      `http://localhost:8080/responsivemeals/clientes/${user.idCliente}/suscripcion`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          idSuscripcion: suscripcionId
        })
      }
    );
    
    if (response.ok) {
      localStorage.setItem("subscription",props.title)
      alert("Suscripción actualizada!:");
      navigate("/subscription");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

 const handleClick = () => {
    assignSubscription(id); 
  };

  return (
    <>
      <div onClick={handleClick} className="subplan-container">
        <div className="subplan-title"><strong>{title}</strong></div>
        <div className="subplan-text">{description}</div>
        <div className="subplan-price"><strong>Precio:{price}€</strong></div>
      </div>
    </>
  );
}

export default SubPlan;
