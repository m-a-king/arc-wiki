import config from './config/development.js';
import app from './app.js';

app.use((req, res, next) => {
  req.db = config.db;
  next();
});

app.listen(config.port, () => {
  console.log(`App is listening on port ${config.port}!`);
});