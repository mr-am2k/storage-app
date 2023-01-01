const express = require('express')
const cors = require('cors')
const client = require('./db/database')

const app = express();

const employeeRouter = require('./routes/employeeRoute.js')

app.use(express.json());

app.use(cors({
    origin: "*",
    methods: '*',
    allowedHeaders: '*',
    credentials: true, //access-control-allow-credentials:true
}));

//router
app.use('/api/v1/employee', employeeRouter)

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