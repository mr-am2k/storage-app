const express = require('express');
const cors = require('cors');
const client = require('./db/database');
const cookieParser = require('cookie-parser');

const app = express();

const employeeRouter = require('./routes/employeeRoute');
const authRouter = require('./routes/authRoute');
const refreshRouter = require('./routes/refreshRoute');
const userRouter = require('./routes/userRoute');
const supplierRouter = require('./routes/supplierRoute')

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true, //access-control-allow-credentials:true
  })
);

//router
app.use('/api/v1/auth/', authRouter);
app.use('/api/v1/refresh', refreshRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/suppliers', supplierRouter)

const port = 8080;

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
