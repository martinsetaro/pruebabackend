import  express  from 'express';
import  jwt  from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4001;
app.use(express.json());
app.use(cors())

const secretKey = 'secreta';

app.get('/',(req,res)=>{
  res.send("esta funcionando")
})

// Ruta para generar un token JWT
app.post('/login', (req, res) => {
  // Verificar las credenciales (ejemplo sencillo)
  const { username, password } = req.body;
  if (username === 'usuario' && password === '12345') {
    // Generar el token
    const token = jwt.sign({ username }, secretKey);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Ruta protegida que requiere un token válido
app.get('/protegido', (req, res) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      // Verificar y decodificar el token
      const decoded = jwt.verify(token, secretKey);
      res.json({ mensaje: `¡Hola, ${decoded.username}! Esta ruta está protegida.` });
    } catch (error) {
      res.status(401).json({ error: 'Token inválido' });
    }
  } else {
    res.status(401).json({ error: 'Token no proporcionado' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor iniciado en el puerto 4001');
});
