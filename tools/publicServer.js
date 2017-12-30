import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import favicon from 'serve-favicon';
import {login} from './helperFunctions';


/*eslint-disable no-console */
const port = process.env.PORT || 5000 ;
const app = express();
const bodyParser = require('body-parser');


app.use(compression());
app.use(express.static('public'));
app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));
app.use(bodyParser.json());


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/login', (req, res) => {
  // console.log('here req is ',req.body);
  const validationResult = login(req.body.auth);
  let ret = validationResult;
  if (!validationResult.success) {
    return res.status(400).json(ret);
  }
  return res.status(200).json(ret);
});

  
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Apsdfp now running on port", port);
    open(`http://localhost:${port}`);
  }
});

  // Initialize the app.
 /* var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });*/
