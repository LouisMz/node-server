import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import indexRouter from './routes/serveur.js';

const app = express();
var server = createServer(app);
const io = new Server(server)
const port = '8080';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// view engine setup
app.set('port', port);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', {text: msg.text, from: msg.from});
  });
});

server.listen(port, () => {
  console.log('listening on *:8080');
});

export default app;
