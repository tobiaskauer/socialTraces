const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/db.config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options,
)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.traces = require("./trace.model.js")(sequelize, Sequelize);


module.exports = db