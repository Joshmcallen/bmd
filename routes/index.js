var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next){
  res.render('news', {title: 'News'});
});

router.get('/movies', function(req, res, next) {
  res.render('movies', {title: 'Movies'});
});

router.get('/reviews', function(req, res, next){
  res.render('reviews', {title: "Reviews"});
});

router.get('/trailers', function(req, res, next){
  res.render('trailers', {title: 'Trailers'});
});

router.get('/podcasts', function(req, res, next){
  res.render('trailers', {title: 'Podcasts'});
});

router.get('/addpost', function(req, res, next){
  res.render('addpost', {title: 'Add Post'});
});

router.get('/adduser', function(req, res, next){
  res.render('adduser', {title: 'Add User'});
});



module.exports = router;
