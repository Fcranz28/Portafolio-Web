const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.json({ mensaje: "API del Portafolio funcionando" });
});

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

module.exports = app;
