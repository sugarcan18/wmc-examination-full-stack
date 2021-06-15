let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//home
app.get('/' , (req, res) => {
    return res.send({ erroe: false, message: 'Welcome Express API'});
})

//conect DB
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wmc_db'
})
dbCon.connect();

app.get('/product',(req , res) =>{
    dbCon.query('SELECT * FROM product' , (error, results, fields) =>{
        if(error) throw error;

        let message = ""
        if (results === undefined || results.length == 0){
            message = "Product is emty"
        }else{
            message = "Success get Product"
        }
        return res.send({ erroe: false, data: results, message });
    })
})

app.post('/order',(req , res) =>{
    // let name = req.body.productName
    // let price = req.body.price
    // let qty = req.body.qty
    // dbCon.query('SELECT * FROM product' , (error, results, fields) =>{
// }


    // return req
})

app.listen(3000, () =>{
    console.log('Node app is runing or port 3000')
})

module.exports = app;