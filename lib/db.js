import { createConnection } from 'mysql2';

const configs = {
  host: '',
  user: '',
  password: '',
  database: ''
};

const db = createConnection(configs);

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});

export default db;