import express from 'express';
import 'dotenv/config';
import {connect} from './db/db.js'
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

connect();

const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})