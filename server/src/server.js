import fs from 'fs';
import express from 'express';
import passport from 'passport';
import routes from './api/routes/index';
import authorizationMiddleware from './api/middlewares/authorizationMiddleware';
import errorHandlerMiddleware from './api/middlewares/errorHandlerMiddleware';
import routesWhiteList from './config/routesWhiteListConfig';
import sequelize from './data/db/connection';
import env from './env';
import './config/passportConfig';

const app = express();

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/', authorizationMiddleware(routesWhiteList));

routes(app);

const staticPath = process.env.NODE_ENV === 'production'
  ? './dist/client'
  : '../client/build';

app.use((req, res, next) => {
  res.set({
    'Cache-Control': [
      'max-age=34164000',
      'public'
    ]
  });
  next();
});
app.use(express.static(staticPath));

app.get('*', (req, res) => {
  res.write(fs.readFileSync(`${staticPath}/index.html`));
  res.end();
});

app.use(errorHandlerMiddleware);

const port = process.env.NODE_ENV === 'production'
  ? process.env.PORT
  : env.app.port;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}!`);
});
