import React, { useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Transactions from "./Transactions";

const TransactionsTable = (props) => {
  /* Map iteration Transactions componets */
  const element = props.Transs.slice(0,10).map((Element) => {
    return(<Transactions
      Id={Element.ID}
      Concepto={Element.Concepto}
      Monto={Element.Monto.toLocaleString()}
      Fecha={Element.Fecha.slice(0,10)}
      Tipo={Element.Tipo}
    />)
  })
  return (
    <>
      <Col style={{marginTop:"20px"}}>

        {/* Title */}
          <h5>Ultimas 10 Transacciones</h5>
        
          <Table striped bordered hover>

            {/* Table head */}
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>tipo</th>
              </tr>
            </thead>
            <tbody>
              {/* Tables Rows */}
              {element}
            </tbody>
          </Table>
      </Col>
    </>
  );
};

export default TransactionsTable;
