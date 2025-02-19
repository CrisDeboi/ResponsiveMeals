import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import "./Filter.css";

function Filter() {
  return (
    <Accordion style={{}}>
      <Accordion.Item eventKey="0" style={{}}>
        <Accordion.Header className="filter-header">Filtros</Accordion.Header>
        <Accordion.Body
          style={{
            backgroundColor: "#F89D53",
            display:"flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Form style={{}}>
            <Form.Switch  label="Pollo" />
            <Form.Switch  label="Cerdo" />
            <Form.Switch  label="Ternera" />
            
          </Form>
          <Form style={{}}>
            <Form.Switch  label="Vegano" />
            <Form.Switch  label="Cuchara" />
            
          </Form>
          <Form style={{}}>
            <Form.Switch  label="Frio" />
            <Form.Switch  label="Pescado" />
            
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Filter;
