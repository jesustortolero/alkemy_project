import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Interface from "./components/interface/Interface";
import Log from "./components/log/Log";
import UserContext from "./components/UserContext";
import LogContext from "./components/LogContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function App() {
  /* useContext states */
  const [log, setLog] = useState(false);
  const[userInfo,setUserInfo]=useState({})
  return (
    <>
      <Container fluid>
        <LogContext.Provider value={{ log, setLog }}>
          <UserContext.Provider value={{userInfo,setUserInfo}}>
            {/* conditional rendering login / interface */}
            {log == true ? <Interface /> : <Log />}
          </UserContext.Provider>
        </LogContext.Provider>
      </Container>
    </>
  );
}

export default App;
