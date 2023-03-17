
module.exports = {
    port: process.env.PORT || 3000,
    db: {
      database: process.env.DB_NAME || '', //database name
      user: process.env.DB_USER || '',
      password: process.env.DB_USER || '',
      options: {
        dialect: process.env.DIALECT || '',
        host: process.env.HOST || '',
        storage: process.env.STORAGE || '',
        logging: false
      }
    }
  }
  