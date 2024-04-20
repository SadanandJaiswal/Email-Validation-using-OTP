const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDatabase = require('./config/database');
const PORT = process.env.PORT || 8000;

const app = express();

connectDatabase();

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const routes = require('./routes/routes.js');
app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})