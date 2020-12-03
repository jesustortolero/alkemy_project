import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const TrasRegForm = () => {
  return (
    <Formik
      initialValues={{
        Concepto: "",
        Monto: "",
        Fecha: "",
        Tipo:""
      }}
      /* ---------------------OnSubmit Handeler---------------------*/
      onSubmit={(values, { setSubmitting, resetForm }) => {
        /* -------- Post --------- */
        fetch("http://localhost:3002/reg-trans", {
          credentials: "omit",
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
            console.log(data);
            setSubmitting(false);
            resetForm();

            /* ----- ERROR ----- */
          })
          .catch((error) => {
            console.log(error);
          });
      }}
      /*  --------------------- validationSchema --------------------- */
      validationSchema={Yup.object().shape({
        Concepto: Yup.string().required("Campo requerido."),
        Monto: Yup.string().required("Campo requerido."),
        Fecha: Yup.date().required("Campo requerido."),
        Tipo: Yup.string().required("Campo requerido.")

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
                <Col md={6}>
                  <Row>
                    <h2>Registro de transacción</h2>
                  </Row>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Concepto">
                      <Form.Label>Concepto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Concepto"
                        value={values.Concepto}
                        name="Concepto"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          !!errors.Concepto && touched.Concepto && "error"
                        }
                      />
                    </Form.Group>

                    <Form.Group controlId="Monto">
                      <Form.Label>Monto</Form.Label>
                      <Form.Control
                        placeholder="Monto"
                        type="text"
                        value={values.Monto}
                        name="Monto"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.Monto && touched.Monto && "error"}
                      />
                    </Form.Group>
                    <Form.Group controlId="Fecha">
                      <Form.Label>Fecha</Form.Label>
                      <Form.Control
                        type="date"
                        value={values.Fecha}
                        name="Fecha"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.Fecha && touched.Fecha && "error"}
                      />
                    </Form.Group>
                    <Form.Group controlId="Tipo">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="egreso/ingreso"
                        value={values.Tipo}
                        name="Tipo"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          !!errors.Tipo && touched.Tipo && "error"
                        }
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Registrar
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

export default TrasRegForm;
