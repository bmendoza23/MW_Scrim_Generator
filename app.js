const express = require('express');
const app = express();
const path = require('path');
app.set("views", path.join(__dirname,"views"));

//Serving Static Contents
app.use(express.static('static'));

app.use(express.urlencoded({
        extended: true
}));
/*app.use('/', (req,res) => {
        console.log('Rendering Home Page');
        res.status(200).render("index");
        console.log('Successfully Rendered');
})
*/
app.listen(2000);