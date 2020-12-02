const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../db/db');
router.get('/welcome',(req,res)=>{
  res.send('Welcome to my api');
})
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

//-----Profile------//
router.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query("SELECT * FROM usuario WHERE id_usuario=?", [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//---Update Profile----//
router.put('/profile/:id', (req, res) => {
  const {correo,userName,contraseña} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE usuario SET usuario.correo = '${correo}',usuario.contraseña = '${contraseña}',usuario.nombre = '${userName}' WHERE id = '${id}'`,(err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario actualizado'});
    } else {
      console.log(err);
    }
  });
});
//--Delete Profile---//
router.delete('/delete/:id', (req, res) => {
  const { id} = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id_usuario = ?',
   [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario eliminado!'});
    } else {
      console.log(err);
    }
  });
});

//--Update points exp---//
router.put('/quiz/:id', (req, res) => {
  const {puntaje,experiencia} = req.body;
  const { id } = req.params;
  mysqlConnection.query(`UPDATE Juego SET Juego.puntaje = '${puntaje}',Juego.experiencia = '${experiencia}' WHERE id_juego = '${id}'`,(err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario actualizado'});
    } else {
      console.log(err);
    }
  });
});

//--Get user player--//
router.get('/profile/quiz/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query("SELECT correo,nombre, puntaje, experiencia from usuario INNER JOIN Juego ON usuario.id_usuario = Juego.id_juego", [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});
//--Get exp and points--//
router.get('/quiz/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query("SELECT puntaje, experiencia from Juego where id_juego=?", [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//--Get Ranking---//
router.get('/ranking', (req, res) => {
     
  mysqlConnection.query('SET @numero=0; SELECT @numero:=@numero+1 AS `posicion`, nombre, experiencia from usuario INNER JOIN Juego ON usuario.id_usuario = Juego.id_juego order by experiencia desc', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
//--Post Comment---//
router.post('/comentario/',(req,res)=>{
  const {respuesta,id_comentar} = req.body;
  let comenatario = [respuesta,id_comentar];
  let nuevoComentario = `INSERT INTO Comentarios(respuesta,id_comentar)
                    VALUES(?,?)`;
  mysqlConnection.query(nuevoComentario,comenatario,  (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Comentario agregaddo`, })
    });
  });  
//--Get Comments---//
router.get('/comentario/', (req, res) => {
     
  mysqlConnection.query('SELECT  nombre, likes,dislikes,respuesta from usuario INNER JOIN Comentarios ON usuario.id_usuario = Comentarios.id_comentar order by id_comentar  desc', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
  });
module.exports = router;