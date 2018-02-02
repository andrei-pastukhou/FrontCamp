const express = require('express');
const router = express.Router();
var passport = require("passport");
const isAuthenticated = require('../auth/authenticate')
const Post = require('../models/post');
const NOT_FOUND = 404;
const NO_ACCESS = 403;
/* GET home page. */

// Return  all existing posts
router.get('/', isAuthenticated, (req, res, next) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.send(err);
        } else {
            res.json(posts);
        }
    });
});

// Return post_id's post
router.get('/:post_id', isAuthenticated, (req, res, next) => {
    Post.findById(req.params.post_id, (err, post) => {
        if (err) {
            res.sendStatus(NOT_FOUND);
        }
        if (post === null) {
            res.sendStatus(NOT_FOUND);
        } else {
            res.json(post);
        }
    });
});


// Save Post
router.post('/', (req, res, next) => {
    let post = new Post();
    Object.assign(post, req.body)
    post.save(function (err) {
        if (err) {
            res.send(err);
        } else {
            res.json({message: 'Post created!'});
        }
    });
});

// Update Post
router.put('/:post_id', (req, res, next) => {
    Post.findById(req.params.post_id, (err, post) => {
        if (err) {
            res.send(err);
        }
        if (post === null) {
            res.sendStatus(NOT_FOUND);
        } else {
            Object.assign(post, req.body)
            post.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Post updated!'});
            });
        }
    });
});

router.delete('/:post_id', (req, res, next) => {
    Post.findById(req.params.post_id, (err, post) => {
        if (err) {
            res.send(err);
        }
        if (post === null) {
            res.sendStatus(NOT_FOUND);
        } else {
            post.remove(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({message: 'Post deleted!'});
            });
        }
    });
});



module.exports = router;
