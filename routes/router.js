import { Router } from 'express';

var router = Router();

const data = {
	"authors" : [
		{ "id": 1, "firstName": "Tom", "lastName": "Coleman" },
		{ "id": 2, "firstName": "Sashko", "lastName": "Stubailo" },
		{ "id": 3, "firstName": "Mikhail", "lastName": "Novikov" },
	]
	,"posts" : [
		{ "id": 1, "authorId": 1, "title": "Introduction to GraphQL", "votes": 2 },
		{ "id": 2, "authorId": 2, "title": "Welcome to Meteor", "votes": 3 },
		{ "id": 3, "authorId": 2, "title": "Advanced GraphQL", "votes": 1 },
		{ "id": 4, "authorId": 3, "title": "Launchpad is Cool", "votes": 7 },
	]
};

const user = {
  "username": "admin",
  "password": "admin",
};

function isLogin(req, res, next) {
  if (req.session && req.session.isLogin) {
    next();
  } else {
    res.redirect('/login',{title: 'Login'});
  }
}

function Login(req, res, next) {
  const { username, password } = req.body;
  if (username == user.username && password == user.password){
    req.session = {}
    req.session.isLogin = true;
    req.session.name = 'Clément';
    next();
  } else {
    res.render('login.ejs', {title: 'Login', req: req});
  }
}

function authorsPosts (id, type) {
  if (id) {
    const data = type.find(type => type.id == id);
    if (data) {
      return JSON.stringify(data);
    } else {
      return JSON.stringify(null);
    }
  }
  return JSON.stringify(type);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  req = {}
  res.render('index.ejs', { title: 'Express', req: req });
});

router.get('/chat', function(req, res, next) {
  res.render('chat.ejs', { title: 'Chat', req: req });
});

router.get('/fetch', function(req, res, next) {
  res.render('fetch.ejs', { title: 'Ajax utilisation HTML', req: req });
});

router.get('/weather', function(req, res, next) {
  res.render('weather.ejs', { title: 'Météo', req: req });
})

router.get('/data/authors/:id?', (req, res) => {
  res.end(authorsPosts(req.params.id, data.authors));
});

router.get('/data/posts/:id?', (req, res) => {
  res.end(authorsPosts(req.params.id, data.posts));
})

router.get('/login', function(req, res, next) {
  res.render('login.ejs', {title: 'Login', req: req})
})

router.post('/login', Login, (req, res) => {
   res.redirect('/');
})

router.get('/logout', isLogin, (req, res) => {
  req.session.destroy();
  res.redirect('/login');
})

export default router;