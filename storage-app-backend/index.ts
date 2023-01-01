
import express from 'express'
import cors from 'cors'
import client from './src/db/database.js';

const app = express();

import router from './src/routes/employeeRoute.js'

app.use(express.json());

app.use(cors({
    origin: "*",
    methods: '*',
    allowedHeaders: '*',
    credentials: true, //access-control-allow-credentials:true
}));

//router
app.use('/api/v1/employee', router)

const port = 3000;

const start = async () => {
    try {
        await client.connect();
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();