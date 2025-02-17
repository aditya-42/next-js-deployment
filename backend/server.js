const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userController = require('./controllers/UserController'); 
const dotenv = require('dotenv');

dotenv.config();

// middleware
app.use(express.json());
app.use('/api', userController); 

// mongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));