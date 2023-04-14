import express, { json, urlencoded } from 'express';
import path, { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import indexRouter from './routes/router.js';
import session from 'express-session';

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
  res.render('404.ejs', { title: '404' });
});

app.use(session({
  secret: 'My_digital_shcool',
  resave: false,
  saveUninitialized: false
}))

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
