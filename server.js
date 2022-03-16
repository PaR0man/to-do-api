const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: 'http://localhost:8082'
};

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });
   

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
    db.mongoose.connect(db.url,{
        useNewUrlParser :true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.log('Can not connect to the database!',err);
        process.exit();
    });

require ('./app/routes/todo.routes')(app);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is runnging on port ${PORT}`);
});