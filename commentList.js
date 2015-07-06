var React = require("react");
var Comment = require("./comment");
var LikeButton = require("./likeButton");

var CommentList = React.createClass({
	render: function () {
				var commentNodes = this.props.data.map( function (comment ) {
					return (
						<Comment author={ comment.author }>
							{ comment.text  }
							<LikeButton liked= { comment.liked } 
										commentId = { comment._id }/>
						</Comment>
						)
				});
				return (
					<div className="commentList">
						{ commentNodes }
					</div>
					);
			}
});

module.exports = CommentList;
