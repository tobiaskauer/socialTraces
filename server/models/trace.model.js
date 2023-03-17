module.exports = (sequelize, Sequelize) => {
    const Trace = sequelize.define("trace", {
      source: {
        type: Sequelize.INTEGER
      },
      event: {
        type: Sequelize.STRING
      }
    });
  
    return Trace;
  };