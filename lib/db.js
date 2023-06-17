var mysql = require('mysql2');

var configs = {
  host: '',
  user: '',
  password: '',
  database: ''
};

var db = mysql.createConnection(configs);

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});

module.exports = db;