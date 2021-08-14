const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'nhumai',
  host: 'localhost',
  port: 5432,
  database: 'products'
});

module.exports = pool;