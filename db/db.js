const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'b8nxnwyrhlgv0mcqzqul-mysql.services.clever-cloud.com',
  user: 'u9hw65ifzsbedbqu',
  password: 'ynuegJXp1tz9eHIneBjP',
  database: 'b8nxnwyrhlgv0mcqzqul',
  multipleStatements: true
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('base de datos conectada!');
  }
});

module.exports = mysqlConnection;