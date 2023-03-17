
module.exports = {
    port: process.env.PORT || 3000,
    db: {
      database: process.env.DB_NAME || 'socialTraces', //database name
      user: process.env.DB_USER || 'socialTraces',
      password: process.env.DB_USER || 'rxy%P0#S!fs0',
      options: {
        dialect: process.env.DIALECT || 'sqlite',
        host: process.env.HOST || 'localhost',
        storage: process.env.STORAGE || './socialTraces.sqlite',
        logging: false
      }
    }
  }
  