import React, { useState } from "react";

const Greeatings = (props) => {
  const [User, setUser] = useState("usuario");

  return (
    <>
      <h4>¡Hola! {props.name} aquí esta tu balance:</h4>
    </>
  );
};

export default Greeatings;
