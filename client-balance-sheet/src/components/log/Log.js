import React, {useContext} from "react";

import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import LogContext from "../LogContext";
import UserContext from "../UserContext"


const Log = () => {

  /* useContext methods */
  const {log,setLog} = useContext(LogContext);
  const {userInfo,setUserInfo} = useContext(UserContext);
  return (
    <Formik
      initialValues={{
        Email: "",
        Password: "",
      }}
      /* ---------------------OnSubmit Handeler---------------------*/
      onSubmit={(values, { setSubmitting, resetForm }) => {
        /* -------- Post --------- */
        fetch("http://localhost:3002/log", {
          credentials: 'omit',
          method: "POST",
          headers: {
            "Content-Type": "application/json",            
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            return res.json();

            /* ----- SUCCESS ----- */
          })
          .then((data) => {
            {setLog(data.message)}
            setUserInfo(data.Data)
            setSubmitting(false);
            resetForm()

            /* ----- ERROR ----- */
          })
          .catch((error) => {
            console.log(error);
          });
      }}
      /*  --------------------- validationSchema --------------------- */
      validationSchema={Yup.object().shape({
        Email: Yup.string()
          .email("La dirección email debe ser valida.")
          .required("Campo requerido."),
        Password: Yup.string().required("Campo requerido."),
      })}
    >
      {/* --------------------- Formik Props --------------------- */}
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <>
            <Container>
              <Row className="justify-content-center">
                <Col  md={4}>

                  {/* Login Form */}
                  <Form onSubmit={handleSubmit}>

                    {/* Email address */}
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={values.Email}
                        name="Email"
                        placeholder="Dirección email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          !!errors.Email && touched.Email && "error"
                        }
                      />
                    </Form.Group>

                        {/* COntraseña */}
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        placeholder="Password"
                        type="password"
                        placeholder="Contraseña"
                        value={values.Password}
                        name="Password"
                        placeholder="Contraseña"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          !!errors.Password && touched.Password && "error"
                        }
                      />
                      {/* Register link */}
                    </Form.Group>
                    <a href="#/">No estoy registrado</a>
                    <br />
                    <br />

                    {/* Login button */}
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </>
        );
      }}
    </Formik>
  );
};

export default Log;
