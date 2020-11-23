const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors({origin: '*'}));

app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req,res)=>{
  res.send('hi');
});
// Ajustes
app.set('port',process.env.PORT || 3001);

// Middlewares
app.use(express.json());

// Routes//
app.use('/api',routes);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});