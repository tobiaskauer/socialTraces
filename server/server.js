const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const https = require('https');
const http = require('https');
const fs = require('fs');
dotenv.config()

const credentials = {} 
const ENVIRONMENT = process.env.ENVIRONMENT || 'local';
if(ENVIRONMENT == "STAGING" || ENVIRONMENT == "PRODUCTION") {
  const CREDDIR = process.env.CREDDIR
  
  const privateKey = fs.readFileSync(CREDDIR+'privkey.pem', 'utf8');
  const certificate = fs.readFileSync(CREDDIR+'cert.pem', 'utf8');
  const ca = fs.readFileSync(CREDDIR+'chain.pem', 'utf8');

	credentials.key = privateKey,
	credentials.cert = certificate,
	credentials.ca = ca
}

const app = express();


const CORS = process.env.CORS || 'http://localhost';
var corsOptions = {
  origin: CORS
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


require("./routes/trace.routes")(app);



const PORT = process.env.PORT || 8080;
const db = require("./models");

if(credentials.cert) {
  
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT);
  console.log(`HTTPS is running on port ${PORT}.`);
} else {
  var httpServer = http.createServer(app);
httpServer.listen(PORT);
console.log(`HTTPS is running on port ${PORT}.`);
}



db.sequelize.sync(
  //{force:true} //dont use force in prod
)

  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });