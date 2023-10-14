import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import router from './router';
import config from './config';

const app = express();

app.use(cors());
app.use(morgan('common'));

app.use(router);

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(config.port, () => {
  console.log('Server started');
});
