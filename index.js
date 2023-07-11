import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'

import connectDB from './mongodb/connect.js';
// import postRoutes from './routes/postRoutes.js';
import outputRoutes from './routes/outputRoutes.js'
import askqRoutes from './routes/askqRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }));

// app.use('/api/v1/post', postRoutes);
app.use('/api/v1/output', outputRoutes);
app.use('/api/v1/askq', askqRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from melissa',
    });
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
        console.log(error);
    }
};

startServer();