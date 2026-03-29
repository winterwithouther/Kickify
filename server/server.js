import express from 'express'
import cors from 'cors'
import sneakerRouter from "./routes/sneakersRoutes.js"

const app = express()
const PORT = 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Kickify API is running')
});
// routes
app.use('/sneakers', sneakerRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});