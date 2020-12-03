const express = new require("express");
const bcrypt = require("bcrypt");
const db = require("./db/index.js");

const app = express();

app.use(express.json());

/* CORS config */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* -----------Rutes----------- */

/* ----------All Data---------- */
app.get("/all", async (req, res) => {
  let resultado = await db.all(req.query.Id);
  console.log(resultado);
  res.send(resultado);
});

/* ----------login---------- */
app.post("/log", async (req, res) => {
  /* Email data */
  const data = {
    Email: req.body.Email,
  };
  /* DB logIn */
  let result = await db.logIn(data);
  /* Response */

  /* Usuario invalido */
  if (result.Email == false) {
    return res.status(400).send({ message: "Usuario invalido" });
  }
  try {
    /* Login exitoso */
    if (await bcrypt.compare(req.body.Password, result.Password)) {
      res.send({
        message: true,
        Data: { Id: result.Id, Email: result.Email, Nombre: result.Nombre },
      });
    } else {
    /* Contraseña incorrecta */
      res.send({ message: "Contraseña incorrecta" });
    }
  } catch {
    /* Error */
    res.status(500).send();
  }

  res.send();
});

/* ----------Registro Usuario---------- */
app.post("/reg", async (req, res) => {
  /* Generacion de Salt Unico */
  const salt = await bcrypt.genSalt();

  /* Bcrypt Contraseña hash */
  const ContraseñaHash = await bcrypt.hash(req.body.Password, salt);

  /* Asignacion Data */
  const data = {
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Email: req.body.Email,
    Contraseña: ContraseñaHash,
  };

  /* DB Registro de Usuario */
  let result = await db.regUser(data);

  /* Envio de Respuesta */
  res.send(`${result}`);
});

/* ----------Registro Transacción---------- */
app.post("/reg-trans", async (req, res) => {
  const data = {
    userID: "1",
    Concepto: req.body.Concepto,
    Monto: req.body.Monto,
    Fecha: req.body.Fecha,
    Tipo: req.body.Tipo,
  };

  /* DB REgistro de Transacción */
  let result = await db.regTrans(req.body);

  /* Envio de Respuesta */
  res.send(`${result}`);
});

/* Eliminar Transacción*/
app.post("/del", () => {});

/* Modificar Transacción */
app.post("/update", () => {});

/* Port config */
app.listen(3002, function () {
  console.log("Start in port 3002");
});
