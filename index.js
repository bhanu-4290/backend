import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'


import tourRoute from './routes/tours.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin:true,
    credentials:true,
}

mongoose.set("strictQuery", false);

const connect =  async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
          useNewUrlParser:true,
          useUnifiedTopology:true  
        });
        console.log('connected to db');
    } catch (err) {
        console.log('db connection failed')
    }
}
  



app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/tours',tourRoute );
app.use('/api/v1/auth', authRoute );
app.use('/api/v1/user', userRoute);
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)


app.listen(port, () => {
    connect();
    console.log('server listening on port', port);
})