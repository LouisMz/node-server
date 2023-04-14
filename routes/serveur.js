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
  res.render('index.ejs', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  res.render('chat.ejs');
});

router.get('/fetch', function(req, res, next) {
  res.render('fetch.ejs');
});

router.get('/weather', function(req, res, next) {
  res.render('weather.ejs');
})

router.get('/data/authors/:id?', (req, res) => {
  res.end(authorsPosts(req.params.id, data.authors));
});

router.get('/data/posts/:id?', (req, res) => {
  res.end(authorsPosts(req.params.id, data.posts));
})

router.use((req, res, next) => {
  res.render('404.ejs');
})

export default router;