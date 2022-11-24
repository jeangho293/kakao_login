import * as express from 'express';
import * as morgan from 'morgan';
import {router} from "./routes";

const app = express();
const port = 4000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
