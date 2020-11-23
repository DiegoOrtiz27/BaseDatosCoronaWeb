const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/db');

/*------------LOGIN------------- */
router.post('/',(req,res)=>{
  const {correo,contraseña} = req.body;
  let iniciarsesion = [correo,contraseña];
  let login = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";

  mysqlConnection.query(login, iniciarsesion, (err, results, fields) => {
    if (err) {
      res.send({err:err});
    } 
      if (results.length>0){
        res.send(results)
        res.status(200).send({ success: true })
      }else{
        res.send({message: `Correo y/o Contraseña incorrecto`})
      }
    });

});

/*------------REGISTER------------- */
router.post('/register/',(req,res)=>{
const {userName,correo,contraseña} = req.body;
let usuario = [correo,userName,contraseña];
let nuevoUsuario = `INSERT INTO usuario(correo,nombre,contraseña)
                  VALUES(?,?,?)`;
mysqlConnection.query(nuevoUsuario, usuario, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Usuario Registrado`, })
  });
});  

router.put('/actor/:id', (req, res) => {
  const {nombres,apellidos,correo,documento,telefono_celular,
    fecha_nacimiento,institucion_id} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE actores SET nombres = ?,apellidos = ?,
  correo = ?,documento = ?,telefono_celular = ?,fecha_nacimiento = ?,
  institucion_id = ? WHERE id = ?`, 
  [nombres,apellidos,correo,documento,telefono_celular,fecha_nacimiento,
    institucion_id,id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante actualizado'});
    } else {
      console.log(err);
    }
  });
});

router.delete('/actor/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM actores WHERE id = ?',
   [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante eliminado!'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;