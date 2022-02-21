const app = require('express')();
const consign = require('consign');
const cors = require('cors');
const knex = require('knex');
const winston = require('winston');
const uuid = require('uuidv4');

const knexfile = require('../knexfile');

// app.db = knex(knexfile[process.env.NODE_ENV]);
// app.db = knex(knexfile.test);

if (process.env.PRODUCTION === 'true') {
  app.db = knex(knexfile.production);
} else {
  app.db = knex(knexfile.test);
}

app.use(cors());
// "scripts": {
//   "start": "set NODE_ENV=prod& node src/server.js",
//   "lint": "eslint src/** test/** --fix",
//   "secure-mode": "set NODE_ENV = test & jest --watchAll --runInBand --verbose=true",
//   "test": "set NODE_ENV = test & jest  --coverage --runInBand --forceExit"
// },

// "scripts": {
//   "start": "node src/server.js",
//   "lint": "eslint src/** test/** --fix",
//   "secure-mode": "jest --watchAll --runInBand --verbose=true",
//   "test": "jest  --coverage --runInBand --forceExit"
// },

app.log = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({ format: winston.format.json({ space: 1 }) }),
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'warn',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json({ space: 1 })),
    }),
  ],
});

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  app.log.debug('passei por aqui');
  res.status(200).send();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'validationError') res.status(400).json({ error: message });
  else if (name === 'forbiddenError') res.status(403).json({ error: message });
  else {
    const id = uuid();
    app.log.error(name, message, stack);
    res.status(500).json({ id, error: 'Erro do sistema ' });
  }
  next(err);
});

module.exports = app;
