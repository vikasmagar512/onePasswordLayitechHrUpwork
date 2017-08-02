import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import {login} from './helperFunctions';

/* eslint-disable no-console */
const port = 3000;
const app = express();
const compiler = webpack(config);
const bodyParser = require('body-parser');

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(favicon(path.join(__dirname,'assets','public','favicon.ico')));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.post('/login', (req, res) => {
	const validationResult = login(req.body.auth);
	let ret = validationResult;
	if (!validationResult.success) {
		return res.status(400).json(ret);
	}
	return res.status(200).json(ret);
});

/*
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});*/

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

