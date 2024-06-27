const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const url = "mongodb://127.0.0.1:27017/Concesionaria";
const port = 3000;

mongoose
  .connect(url, {})
  .then(() => console.log("Base de datos Concesionaria"))
  .catch((e) => console.log("ERROR " + e));
  const infoSchema = new mongoose.Schema({
    motor: String,
    color: String,
  }, { _id: false });
  
  const vehiculoSchema = new mongoose.Schema({
    marca: String,
    ano: String,
    modelo: String,
    info: infoSchema
  }, { versionKey: false });
const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);

app.use(cors());
app.use(bodyParser.json());







app.post("/envio_v", async (req, res) => {
    
    try {
      const nuevoVehiculo = new Vehiculo({
        marca: req.body.marca,
        modelo: req.body.modelo,
        ano: req.body.ano,
        info: {
          motor: req.body.motor,
          color: req.body.color
        }
      });

    const vehiculoGuardado = await nuevoVehiculo.save();
    res.status(200).json(vehiculoGuardado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/asd' , async (req,res) =>{
  const vh = await Vehiculo.find();
  res.send( vh );
})

const mostrar = async () => {
	const vh = await Vehiculo.find()
	console.log(vh)
}
mostrar();

app.listen(port, () => {
  console.log("Ejecutando en http://localhost:" + port);
});



