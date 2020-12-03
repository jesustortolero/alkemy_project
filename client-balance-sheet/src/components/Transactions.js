import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const Transactions = (props) => {
  /* useState control visibility */
  const [visibility, setVisibility] = useState(false);

  return (
    <>
            <Button
        variant="dark"
        style={visibility ? { display: "block" } : { display: "none" }}
        className="deleteButton"
        onMouseEnter={() => {
          setVisibility(true);
        }}
        onMouseLeave={() => {;
          setVisibility(false);
        }}
      >
        x
      </Button>
      <tr
        onMouseEnter={() => {
          setVisibility(true);
        }}
        onMouseLeave={() => {
          setVisibility(false);
        }}
      >
        <td>{props.Concepto}</td>
      <td>{props.Monto}</td>
      <td>{props.Fecha}</td>
      <td>{props.Tipo}</td>
      </tr>
    </>
  );
};

export default Transactions;
