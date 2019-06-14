const join = require('path').join;
const config = {
  name: 'blog',
  modelPath: join(__dirname, '../app/models'),
  db: 'blog',
  username: 'blog',
  password: 'Pol2516!',
  dialect: 'mysql',
  host: '47.99.181.99',
  port: 3306,
  pool: {
    maxConnections: 10,
    minConnections: 0,
    maxIdleTime: 30000
  }
};

module.exports = config