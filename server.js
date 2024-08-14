import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// // importing syntax is different
// // because  "type": "module", inside the package .json folder
// const express = require('express');

// configure env
dotenv.config();

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


// rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Ecommerce app</h1>")
})

//port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})