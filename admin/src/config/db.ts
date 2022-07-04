import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import configs from '../config/constants';

// Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
    connect(configs.db.production)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch(err => console.error("Could not connect to db", err));
} else {
    connect(configs.db.development)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch(err => console.error("Could not connect to db", err));
};