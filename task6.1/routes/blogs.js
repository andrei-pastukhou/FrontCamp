var express = require('express');
var router = express.Router();
var Post = require('../models/post');
/* GET home page. */

// Return  all existing posts
router.get('/', function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err)
      res.send(err);

    res.json(posts);
  });

  //res.render('post_form', { title: 'Express lol'});
});

// Return post_id's post
router.get('/:post_id', function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {
    if (err) {
      res.sendStatus(404);
    }
    if (post === null) {
      res.sendStatus(404);
    } else {
      res.json(post);
    }
  });
});


// Save Post
router.post('/', (function (req, res) {

  console.log(req.body);
  var post = new Post();

  post.title = req.body.title;
  post.text = req.body.text;
  post.author = Number(req.body.author);

  // save the post and check for errors
  post.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({message: 'Post created!'});
    }
  });
}));

// Update Post
router.put('/:post_id', (function (req, res) {

  Post.findById(req.params.post_id, function (err, post) {
    if (err) {
      res.send(err);
    }
    if (post === null) {
      res.sendStatus(404);
    } else {
      post.title = req.body.title;
      post.text = req.body.text;
      post.author = Number(req.body.author);

      post.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Post updated!'});
      });
    }
  });
}));

// delete Post
router.delete('/:post_id', (function (req, res) {

  Post.findById(req.params.post_id, function (err, post) {
    if (err) {
      res.send(err);
    }

    if (post === null) {
      res.sendStatus(404);
    } else {
      post.remove(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({message: 'Post deleted!'});
      });
    }
  });
}));

module.exports = router;
