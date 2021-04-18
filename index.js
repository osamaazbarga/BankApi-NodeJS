
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()
const port =8080;

const usersRoute = require('./routes/bank.routes')


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/',usersRoute);



// app.listen(port,()=>{
//     console.log(`application start at ${port}`)
// })


app.listen(process.env.PORT || 5000);
