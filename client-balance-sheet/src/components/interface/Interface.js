import React, {useState} from "react";
import TrasRegForm from "../TransRegForm"
import { Row, Col } from "react-bootstrap";
import Home from "../Home";



const Interface = () => {

  
  const [screen, setScreen] = useState('Home');

  switch (screen){
    case 'Home':
    return(
      <>
      <Home />
      </>
    )
    break;
    case 'Create':

      return (
        <>
        <Row>
        <TrasRegForm />
        </Row>
        </>
      )

    break;

  }

  
}

export default Interface;
