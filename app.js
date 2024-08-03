require('dotenv').config();
const express = require('express');
const router = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('./models');

const db = require('./models/database');



const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(morgan());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('*/images', express.static(__dirname + '/public/images'));

app.use('/', router)




db.sync({alter:true}).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})