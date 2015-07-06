var fs = require("fs");
var $ = require("jquery");
var Comment = require("./models/comment");

var getAllComments = function (CB) {
	Comment.find({}, function(err, comments) {
		if (err) {
			CB(err);
		} else {
			CB(null, comments);
		}
	});
};

var routes  = {
	"index" : function (req, res) {
		res.render("app");
	},
	"getComments" : function ( req, res ) {
		var getCommentsSuccess = function (err, comments) {
			if (err) {
				throw err;
			} else {
				res.setHeader("Content-type", "application/json");
				res.send(JSON.stringify(comments));
			}
		};
		
		getAllComments(getCommentsSuccess);

	},
	"newComment" : function ( req, res ) {
		var newCommentJSON = req.body;	
		var newComment = new Comment(newCommentJSON);
		
		newComment.save(function (err) {
			if (err) {
				throw err;
			} else {
				res.setHeader("Content-type", "application/json");
				getAllComments(function (err, comments) {
					if (err) {
						throw err;
					} else {
						res.send(JSON.stringify(comments));
					}	
				});
			}
		});
	},
	"likeComment" : function (req, res) {
		var commentId = req.params.id;
		var likeStatus = req.body;
		console.log(likeStatus);
		console.log(commentId);
		Comment.findByIdAndUpdate( commentId, { $set : likeStatus }, function (err, comment) {
			if (err) {
				res.status(422).send("Unprocessable Entity");
			} else {
				res.status(200);
				res.setHeader("Content-type", "application/json");
				res.send(JSON.stringify("Success"));
			}
		});
	}
};

module.exports = routes;
