import React from "react";
import { Row, Col } from "react-bootstrap";

const Summary = (props) => {
  
  /* Total ingresos */
  const ingreso = props.Transs.filter(Element=> Element.Tipo =='ingreso').reduce((total,val)=>total+=val.Monto,0
  ).toLocaleString()

  /*  Total egresos */
  const egreso =props.Transs.filter(Element=> Element.Tipo =='egreso').reduce((total,val)=>total+=val.Monto,0
  ).toLocaleString();
  return (
    <>
      <Row>
        {/* Ingreso Card */}
        <Col className="whiteCard align-middle ">
        <div style={{padding:'5px'}}>
          <h6 className="ingreso">Ingreso </h6>
          <h5 className="ingreso">${ingreso}</h5>
         </div> 
        </Col>

        {/* Egreso Card */}
        <Col className="whiteCard" style={{marginLeft:'5px', paddingTop:'0px'}}>
            <div style={{padding:'5px'}}>
          <h6 className="egreso">Egreso</h6>
          <h5 className="egreso">${egreso}</h5>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Summary;
