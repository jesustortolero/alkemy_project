import React from "react";
import { Row, Col } from "react-bootstrap";

const Total = (props) => {

  const ingreso = props.Transs.filter(Element=> Element.Tipo =='ingreso').reduce((total,val)=>total+=val.Monto,0
  )
const egreso =props.Transs.filter(Element=> Element.Tipo =='egreso').reduce((total,val)=>total+=val.Monto,0
  )

 const total = (ingreso-egreso);
  
  
  return (
    <>
      <Col xs={{ offset: 1 }} md={{ offset: 3 }}>
        <Row className="">
          <h5>Balance Total</h5>
        </Row>
        <Row className="">
          <h2> {total.toLocaleString()}</h2>
        </Row>
      </Col>
    </>
  );
};

export default Total;
