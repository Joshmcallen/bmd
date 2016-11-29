var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var multer = require('multer');
// var upload = multer({dest: 'public/images/uploads'});

/* GET home page. */
router.get('/', function(req, res, next){
  var articles = req.db.get('articles');
  articles.find({}, {sort: {articleDate: -1} }, function(e, articles) {
    if (e) throw e;
    res.render('index', {title: 'Birth.Movies.Death', articles: articles});
    });
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/news', function(req, res, next){
  var articles = req.db.get('articles');
  articles.find({"category": "News"}, {sort: {articleDate: -1} }, function(e, articles) {
    if (e) throw e;
    res.render('news', {title: 'News | Birth.Movies.Death', articles: articles});
    });
});

router.get('/reviews', function(req, res, next){
  var articles = req.db.get('articles');
  articles.find({"category": "Reviews"}, {sort: {articleDate: -1} }, function(e, articles) {
    if (e) throw e;
    res.render('reviews', {title: 'Reviews | Birth.Movies.Death', articles: articles});
    });
});

router.get('/trailers', function(req, res, next){
  var articles = req.db.get('articles');
  articles.find({"category": "Trailers"}, {sort: {articleDate: -1} }, function(e, articles) {
    if (e) throw e;
    res.render('trailers', {title: 'Trailers | Birth.Movies.Death', articles: articles});
    });
});

router.get('/podcasts', function(req, res, next){
  var articles = req.db.get('articles');
  articles.find({"category": "Podcasts"}, {sort: {articleDate: -1} }, function(e, articles) {
    if (e) throw e;
    res.render('podcasts', {title: 'Podcasts | Birth.Movies.Death', articles: articles});
    });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/article/:id', function(req, res, next){
  var articles = req.db.get('articles');
  var test = req.params.id;
  var _id = new ObjectId(test); //test =id
  articles.find( {_id : _id}, {}, function(e, articles) {
    if (e) throw e;
    console.log(articles);
    res.render('article', {title: 'Birth.Movies.Death', articles: articles});
    });
});
////////////////////////////////////////////////////////////////////////////////

router.get('/authorpage', function(req, res, next) {
  res.render('authorpage', {title: "author page"});
});
router.get('/author/:id', function(req, res, next){
  var authors = req.db.get('authors');
  var test = req.params.id;
  var _id = new ObjectId(test); //test =id
  authors.find( {_id : _id}, {}, function(e, authors) {
    if (e) throw e;
    console.log(authors);
    res.render('authorpage', {title: '#{authors | Birth.Movies.Death', authors: authors});
    });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
router.get('/movies', function(req, res, next) {
  var movies = req.db.get('movies');
  movies.find({}, {}, function(e, movies) {
    if (e) throw e;
    res.render('movies', {title: 'Movies | Birth.Movies.Death', movies: movies});
  });
});
router.get('/movies/:id', function(req, res, next){
  var movies = req.db.get('movies');
  var id = req.params.id;
  var _id = new ObjectId(id);
  movies.find( {_id: _id}, {}, function(e, movies) {
    if (e) throw e;
    console.log(movies);
    res.render('moviespage', {title: 'Movies | Birth.Movies.Death', movies: movies});
  });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//get addpost
router.get('/addpost', function(req, res, next){
  res.render('addpost', {title: 'Add Post'});
});
//post to addpost
router.post('/addpost', function(req, res, next){

  //setting collection 'articles'
  var articles = req.db.get('articles');
  var articleDate = Date();
  var articlepic = '';
  req.file ? articlepic = `/images/uploads/${req.file.filename}` : articlepic = `/images/uploads/default.jpg`;

  //inserting to collection
  articles.insert({
    "category": req.body.category,
    "authorname": req.body.authorname,
    "title": req.body.title,
    "byline": req.body.byline,
    "content": req.body.content,
    "articlepic": articlepic,
    "articleDate": articleDate

  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding to database.");
      }
      else {
          // And forward to success page
          res.redirect("/addpost");
      }
  });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//get adduser
router.get('/adduser', function(req, res, next){
  res.render('adduser', {title: 'Add User'});
});
//post to adduser
router.post('/adduser', function(req, res) {

    //setting collection 'usercollection'
    var authors = req.db.get('authors');

    var authorpic = '';
    req.file ? authorpic = `/images/uploads/${req.file.filename}` : authorpic = `/images/uploads/default.jpg`;


    // Submit to the DB
    authors.insert({
        "authorname": req.body.authorname,
        "authorbio": req.body.authorbio,
        "authorpic": authorpic
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding to database.");
        }
        else {
            // And forward to success page
            res.redirect("/adduser");
        }
    });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//get addmovie
router.get('/addmovie', function(req, res, next){
  res.render('addmovie', {title: 'Add Movie'});
});
//post to addpost
router.post('/addmovie', function(req, res, next){


  var moviepic = '';
  req.file ? moviepic = `/images/uploads/${req.file.filename}` : moviepic = `/images/uploads/default.jpg`;

  //setting collection 'articles'
  var movies = req.db.get('movies');


  //inserting to collection
  movies.insert({
    "moviename": req.body.moviename,
    "releasedate": req.body.releasedate,
    "description": req.body.description,
    "director": req.body.director,
    "cast": req.body.cast,
    "moviepic": moviepic,
    "rating": req.body.rating,
    "trailer": req.body.trailer,
    "screenwriter": req.body.screenwriter


  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding to database.");
      }
      else {
          // And forward to success page
          console.log(req.body);
          console.log(req.file);
          res.redirect("/addmovie");
      }
  });
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


/////////////////////Footer Views/////////////////////////////
///////////////////////////////////////////////////////////////
router.get('/about', function(req, res, next){
  res.render('about', {title: 'About | Birth.Movies.Death'});
});
router.get('/advertise', function(req, res, next){
  res.render('advertise', {title: 'Advertise | Birth.Movies.Death'});
});
router.get('/contact', function(req, res, next){
  res.render('contact', {title: 'Contact | Birth.Movies.Death'});
});
router.get('/privacy', function(req, res, next){
  res.render('privacy', {title: 'Privacy | Birth.Movies.Death'});
});
router.get('/terms', function(req, res, next){
  res.render('terms', {title: 'Terms | Birth.Movies.Death'});
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


module.exports = router;
