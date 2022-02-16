const express = require('express');
const app = express();
const path = require ('path');
//Serving static contents
app.use(express.static('static'));
//app.use("/images", express.static(__dirname + '/static/images'));
app.use(express.urlencoded({
        extended: true
}));

/*app.get('/', (req,res) => {
        console.log('Rendering Home Page');
        res.status(200).render("index");
        console.log('Successfully Rendered');
})
*/
app.listen(2000);