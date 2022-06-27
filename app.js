const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
const dotenv = require('dotenv');
const classifyingRoute = require('./routes/classifying_route');
const cookieParser = require("cookie-parser");
// const ClassifyingForm = require('./model/ClasifyingForm');
// const NewBorn = require('./model/NewBorn');
const ancVisit = require('./model/ANCVisit');
const PreventiveCare = require('./model/PreventiveCare');
 const Delivery = require('./model/Delivery');
// const Bed = require('./model/Bed');
// const Pnc = require('./model/PNC');
// const Client = require('./model/Client');
const care = require('./routes/preventive-care-route');
const router = require('./routes/add_client');
const user_route = require('./routes/user_route');
const ancRoute = require('./routes/anc_route');
const delivery_route = require('./routes/delivery-route');
const message = require('./routes/message-route');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
// const AncVisit = require('./model/ANCVisit');
//  const Message = require('./model/Message');
const app = express();
dotenv.config({ path: './.env' });
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

 app.use(function (req, res, next) {
   res.header(
     "Access-Control-Allow-Headers",
     "x-access-token, Origin, Content-Type, Accept"
   );
   next();
 });

//test database connection
db.authenticate().then( () =>{
    console.log('connected!');
})
.catch( (err) =>{
     console.log(err)
    });

// Delivery.sync({force: true}).then( () =>{
//     console.log('synced!');
// }).catch( (err) =>{
//     console.log(err);
// });

app.get('/', (req, res) =>{
    res.render('home', {
        style: 'user.css'
    });
})

app.use("", router);
app.use("", user_route);
app.use("", classifyingRoute);
app.use("", care);
app.use("", ancRoute);
app.use("", delivery_route);
app.use("", message);

// listening the server
app.listen(3000, () =>{
    console.log('server is started at port 3000');
});
