const express = require('express');
const app = express();

//Serving Static Contents
app.use(express.static('static'));

app.use(express.urlencoded({
        extended: true
}));

app.listen(2000);