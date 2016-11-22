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

///////////////////////////////////////////////////////////////
//get addpost
router.get('/addpost', function(req, res, next){
  res.render('addpost', {title: 'Add Post'});
});
//post to addpost
router.post('/addpost', function(req, res, next){

  //setting collection 'articles'
  var articles = req.db.get('articles');

  //inserting to collection
  articles.insert({
    "authorname": req.body.authorname,
    "title": req.body.title,
    "byline": req.body.byline,
    "content": req.body.content

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
////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
//get adduser
router.get('/adduser', function(req, res, next){
  res.render('adduser', {title: 'Add User'});
});
//post to adduser
router.post('/adduser', function(req, res) {

    //setting collection 'usercollection'
    var usercollection = req.db.get('usercollection');

    // Submit to the DB
    usercollection.insert({
        "authorname": req.body.authorname,
        "authorbio": req.body.authorbio
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
///////////////////////////////////////////////////////////////

/////////////////////Footer Views/////////////////////////////
///////////////////////////////////////////////////////////////
router.get('/about', function(req, res, next){
  res.render('about', {title: 'About'});
});
router.get('/advertise', function(req, res, next){
  res.render('advertise', {title: 'Advertise'});
});
router.get('/contact', function(req, res, next){
  res.render('contact', {title: 'Contact'});
});
router.get('/privacy', function(req, res, next){
  res.render('privacy', {title: 'Privacy'});
});
router.get('/terms', function(req, res, next){
  res.render('terms', {title: 'Terms'});
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


module.exports = router;
