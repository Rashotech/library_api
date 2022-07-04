import dotenv from 'dotenv';
dotenv.config();

const configs = {
    db: {
        development: process.env.DB_STRING!,
        production: process.env.DB_STRING_PROD!,
        test: process.env.DB_STRING_TEST!,
    },
    env: process.env.NODE_ENV,
    client_url: process.env.CLIENT_URL!
}

export default configs;