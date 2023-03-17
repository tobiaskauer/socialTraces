module.exports = app => {
    const traces = require("../controllers/trace.controller.js");
    var router = require("express").Router();
    
    router.post("/", traces.create);
    router.get("/:id", traces.findOneTrace);
    router.get("/", traces.findAllTraces);
  
    app.use('/api/trace', router);
  };