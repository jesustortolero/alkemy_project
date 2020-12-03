import React, { useState } from "react";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UserForm = () => {

  /* Display mensaje error */
  const [errorStatus, setErrorStatus] = useState(false);
  /* Dsplay mensaje success */
  const [successStatus, setSuccessStatus] = useState(false);

  /* state mensaje error */
  const [status, setStatus] = useState("");

  return (

    /* ----------- Formik tag ------------ */
    <Formik
      initialValues={{
        Nombre: "",
        Apellido: "",
        Email: "",
        confEmail: "",
        Password: "",
        ConfPassword: "",
      }}
      /* ---------------------OnSubmit Handeler---------------------*/
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);

        /* -------- Post --------- */
        fetch("http://localhost:3002/reg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
            console.log("respuesta 1:", res);
            return res.json();
          }).then((data) => {
            console.log("respuesta 2: ",data);
            setSubmitting(false);
            resetForm();

            setErrorStatus(false);
            setSuccessStatus(true);

            /* ----- ERROR ----- */
          })
          .catch((error) => {
            console.log("error: ",error);
            setStatus(error).setSubmitting(false);
            setErrorStatus(true);
            setSuccessStatus(false);
          });
      }}
      /*  --------------------- validationSchema --------------------- */
      validationSchema={Yup.object().shape({
        Nombre: Yup.string().required("Campo requerido."),
        Apellido: Yup.string().required("Campo requerido."),
        Email: Yup.string()
          .email("La dirección email debe ser valida.")
          .required("Campo requerido."),
        confEmail: Yup.string()
          .email("La dirección email debe ser valida.")
          .required("Campo requerido.")
          .test("confEmail", "Los emails no coinciden", function (value) {
            return this.parent.Email === value;
          }),
        Password: Yup.string()
          .required("Campo requerido.")
          .min(
            8,
            "Contraseña muy corta - la contraseña debe contener al menos 8 caracteres."
          )
          .matches(
            /(?=.*[0-9])/,
            "La contraseña debe contener al menos un número"
          ),
        ConfPassword: Yup.string()
          .required("Campo requerido.")
          .min(
            8,
            "Contraseña muy corta - la contraseña debe contener al menos 8 caracteres."
          )
          .matches(
            /(?=.*[0-9])/,
            "La contraseña debe contener al menos un número"
          )
          .test("confEmail", "Las contraseñas no coinciden", function (value) {
            return this.parent.Password === value;
          }),
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

        /* --------------------- React-Bootstrap From ---------------------  */
        return (
          <>
            <Row className="justify-content-center" style={{marginTop:"30px"}}>
              <Col xs={6}>

                {/* Form header */}
                <h3>Formulario de Registro</h3>

                <Alert show={successStatus} variant="success">
                  ¡Usuario registrado exitosamente!
                </Alert>

                <Alert show={errorStatus} variant="danger">
                  ¡Algo salió mal! - {status}
                </Alert>

                {/* Input Nombre */}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      placeholder="Nombre"
                      type="text"
                      name="Nombre"
                      value={values.Nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.Nombre && touched.Nombre && "error"}
                    />
                    {/* Mensage de ERROR Nombre */}
                    <Form.Control.Feedback type="invalid">
                      {errors.Nombre}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Input Apellido */}
                  <Form.Group controlId="formLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      name="Apellido"
                      placeholder="Apellido"
                      value={values.Apellido}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        !!errors.Apellido && touched.Apellido && "error"
                      }
                    />
                    {/* Mensaje de error Apellido */}
                    <Form.Control.Feedback type="invalid">
                      {errors.Apellido}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Input Email */}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={values.Email}
                      placeholder="Dirección email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.Email && touched.Email && "error"}
                    />
                    {/* Mensaje de ERROR Email */}
                    <Form.Control.Feedback type="invalid">
                      {errors.Email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Input Confirmar Email */}
                  <Form.Group controlId="formConfirmEmail">
                    <Form.Label>Confirmar Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Confirmar email"
                      name="confEmail"
                      placeholder="Dirección email"
                      value={values.confEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        !!errors.confEmail && touched.confEmail && "error"
                      }
                    />

                    {/* Mensaje de ERROR Confirmar Email */}
                    <Form.Control.Feedback type="invalid">
                      {errors.confEmail}
                    </Form.Control.Feedback>

                    {/* Mensaje inicial Confrimar Email */}
                    {!errors.confEmail && (
                      <Form.Text className="text-muted">
                        Confirma tu direccion de correo electronico.
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* Input Contraseña */}
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="Password"
                      placeholder="Contraseña"
                      name="Password"
                      value={values.Password}
                      placeholder="Dirección email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        !!errors.Password && touched.Password && "error"
                      }
                    />

                    {/* Mensaje de ERROR Contraseña */}
                    <Form.Control.Feedback type="invalid">
                      {errors.Password}
                    </Form.Control.Feedback>

                    {/* Mensaje inicial Contraseña */}
                    {!errors.Password && (
                      <Form.Text className="text-muted">
                        La contraseña deberá contener al menos 8 caracteres y al
                        menos un número.
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* Input Confirmar Contraseña */}
                  <Form.Group>
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirmar Contraseña"
                      controlId="formConfirmPassword"
                      value={values.ConfPassword}
                      name="ConfPassword"
                      placeholder="Dirección email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        !!errors.ConfPassword && touched.ConfPassword && "error"
                      }
                    />

                    {/* Mensaje de ERROR Confirmar Contraseña */}
                    <Form.Control.Feedback type="invalid">
                      {errors.ConfPassword}
                    </Form.Control.Feedback>

                    {/* Mensaje inicial Confirmar Contraseña */}
                    {!errors.ConfPassword && (
                      <Form.Text className="text-muted">
                        Confirmar contraseña
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* --------------------- Submit Button --------------------- */}
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        );
      }}
    </Formik>
  );
};

export default UserForm;
