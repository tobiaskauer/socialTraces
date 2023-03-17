const express = require("express");
const cors = require("cors");


const bodyParser = require("body-parser");
//const multer = require("multer");




const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(multer({dest:'./static'}).single('image'))
app.use(bodyParser.json());



require("./routes/trace.routes")(app);

//app.use('/static', express.static('static'))



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");

db.sequelize.sync(
  //{force:true} //dont use force in prod
)

  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

  //https://www.bezkoder.com/node-js-express-sequelize-mysql/



//  const fs = require('fs');
