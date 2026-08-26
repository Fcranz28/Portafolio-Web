import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
   res.json({ mensaje: 'API del Portafolio funcionando' });
});

app.get('/', (req, res) => {
   res.json({ mensaje: 'API del Portafolio funcionando' });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
   app.listen(PORT, () => console.log(`Servidor API en puerto ${PORT}`));
}

export default app;
