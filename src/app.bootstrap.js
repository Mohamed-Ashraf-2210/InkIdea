import express from 'express'
import { PORT } from '../config/config.service.js';
import { connectDB } from './db/index.js';
import { globalErrorHandling } from '../common/utils/response/error.response.js';

async function bootstrap() {
    const app = express()
    await connectDB()
    app.use(express.json())
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('{/*dummy}', (req, res) => {
        res.status(404).json({ message: "Invalid app routing" })
    })
    app.use(globalErrorHandling)
    app.listen(PORT, () => console.log(`app listen to port number ${PORT}`))
}

export default bootstrap