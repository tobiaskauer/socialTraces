const db = require("../models");
const Trace = db.traces;
const Op = db.Sequelize.Op;

// Create and Save a new Tutoria
exports.create = (req, res) => {
  
    //Validate request
    /*if (!req.body.source) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }*/
  
    // Create a Tutorial
    const traces = req.body.traces.map(trace => {
      return {
        source: trace.source,
        event: trace.event
      }
    })
 
    // Save Tutorial in the database
    Trace.bulkCreate(traces)
      .then(data => {
        res.send(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findOneTrace = (req, res) => {
  res.send({foo: 'bar'})
    
    /*Trace.findAll({
      where: {
        image: image, //image id
        width: {[Op.gt]: 0}, //width > 0
        height: {[Op.gt]: 0},
      },
      attributes: ["id", "category", "text", "image", "x", "y", "width", "height","createdAt"]
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });*/
  };

exports.findAllTraces = (req, res) => {
  Trace.findAndCountAll({
    attributes: ['source','event'],
    group: ['source','event']
  })
  .then(data => {
    //group by source
    let minified = []
    data.count.forEach(e=> {
      let needle = minified.find(single => single.source == e.source)
      if(!needle) {
        let obj = {source: e.source}
        obj[e.event] = e.count
        minified.push(obj)
      } else {
        needle[e.event] = e.count
      }
    })
    
    console.log(minified)
    res.send(minified)
    
  })
  /*Trace.findAll({
    attributes: ["id", "category", "text", "image", "x", "y", "width", "height","createdAt"]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });*/
};
