const express = require('express');
const app = express();

//Serving Static Contents
app.use(express.static('static'));

app.use(express.urlencoded({
        extended: true
}));
app.use('/', (req,res) => {
        console.log('Rendering Home Page');
        res.status(200).render()
        console.log('Successfully Rendered');
})
app.listen(2000);