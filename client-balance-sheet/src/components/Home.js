import React, {useState,useEffect,useContext} from 'react';
import Greetings from "./Greetings";
import Total from "./Total";
import Summary from "./Summary";
import TransactionsTable from "./TransactionsTable";
import { Row, Col } from "react-bootstrap";
import UserContext from "./UserContext"

const Home = ()=>{

const {userInfo} = useContext(UserContext);

const [Transaccions,setTransaccions] = useState();

  useEffect(
    ()=>{

      fetch(`http://localhost:3002/all?Id=${userInfo.Id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",            
          }
        })
          .then((res) => {
            return res.json(res);

            /* ----- SUCCESS ----- */
          })
          .then((data) => {              
            setTransaccions(data);
            /* ----- ERROR ----- */
          })
          .catch((error) => {
            console.log(error);
          });

    },[userInfo]
  )
    return(
        <>
      <Row>
        <Col md={{ offset: 3 }} style={{padding:"0px"}}>
    
          {/* Greatings Component */}
          {userInfo.Nombre!==undefined?<Greetings name={userInfo.Nombre}/>:<>error</>}
        </Col>
      </Row>
      <Row>

        {/* Total Component */}
      {Transaccions?<Total Transs={Transaccions} />:<></>}
      </Row>
      <Row className="justify-content-center">

        {/* Summary Component */}
      {Transaccions?<Summary Transs={Transaccions} />:<></>}
      </Row>
      <Row className="justify-content-center">
        <Col xs={11} md={6}>
          {/* Transaccions Table */}
          {Transaccions? <TransactionsTable  Transs={Transaccions} />:<></>}
        </Col>
      </Row>
      <Row className="justify-content-center">

        {/* All transactions */}
        <button>more</button>

        {/* Register transactions */}
        <button className='rightButton'>Create</button>
      </Row>
    </>
    )
}


export default Home;