const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
// const ClassifyingForm = require('./model/ClasifyingForm');
// const NewBorn = require('./model/NewBorn');
// const ancVisit = require('./model/ANCVisit');
// const PreventiveCare = require('./model/PreventiveCare');
// const Delivery = require('./model/Delivery');
// const Bed = require('./model/Bed');
// const Pnc = require('./model/PNC');
// const Client = require('./model/Client');
const router = require('./routes/add_client');
const user_route = require('./routes/user_route');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// const AncVisit = require('./model/ANCVisit');
const app = express();

//Handlebars
app.engine("hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine' , 'hbs');

// body parser
app.use(bodyParser.urlencoded( {extended: false}));
// Static files
app.use(express.static(path.join(__dirname, 'public')));
// app.use("/js", express.static(__dirname + "/public/js"));
app.use(express.json());

//test database connection
db.authenticate().then( () =>{
    console.log('connected!');
})
.catch( (err) =>{
     console.log(err)
    });

// db.sync({force: true}).then( () =>{
//     console.log('synced!');
// }).catch( (err) =>{
//     console.log(err);
// });

app.get('/', (req, res) =>{
    res.render('home', {
        style: 'user.css'
    });
})

app.use('', router);
app.use("", user_route);
app.listen(3000, () =>{
    console.log('server is started at port 3000');
});
