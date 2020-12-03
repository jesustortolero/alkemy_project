const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "jesus",
  password: "jesus_alkemy",
  database: "alkemy_app_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

alkemyDB = {};

/* Get all */
alkemyDB.all = (val) => {
  console.log(val);
  return new Promise((resolve, reject) => {
  connection.query(
    "SELECT * FROM `transacciones` WHERE `fk_userID`= ? ORDER BY `Fecha` DESC",
    [val],
    (err, result) => {
      if (err) {
        return reject(err);
      } else {
        resolve(result);
      }
    }
  );
});
};

/* Delete */
alkemyDB.del = () => {
  connection.query(
    `DELETE FROM transaccion WHERE id = ?`,
    [],
    (err, result) => {
      if (err) {
        return err;
      } else {
        return "200";
      }
    }
  );
};


/* User register */
alkemyDB.regUser = (val) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO `usuarios`(`Nombre`, `Apellido`, `Email`, `Password`) VALUES (?,?,?,?)",
      [val.Nombre, val.Apellido, val.Email, val.Contraseña],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};


/* Login */
alkemyDB.logIn = (val) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT `Email`,`Password`, `Id`,`Nombre` FROM `usuarios` WHERE `Email`=?",
      [val.Email],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(results[0]);
        }
      }
    );
  });
};

/* Transsaccion */
alkemyDB.regTrans = (val) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO `transacciones`(`fk_userID`, `Concepto`, `Monto`, `Fecha`, `Tipo`) VALUES (?,?,?,?,?)",
      [val.userID,val.Concepto,val.Monto,val.Fecha,val.Tipo],
      (err, results) => {
        if (err) {
          console.log(err);
          return reject(err);
        } else {
          resolve(results.insertId);
        }
      }
    );
  });
};

module.exports = alkemyDB;
