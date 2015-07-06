var React = require("react");
var $ = require("jquery");

var LikeButton = React.createClass({
	getInitialState: function () {
						 return { liked: this.props.liked };
					 },
	handleClick : function (e) {
					  var newLikeStatus = { liked : !this.state.liked };
					  $.ajax({
						  url: "/comments/" + this.props.commentId + "/like",
					  	  dataType: "json",
					  	  contentType: "application/json",
						  data : JSON.stringify(newLikeStatus),
						  type: "POST",
						  success: function () {
						  	  console.log(newLikeStatus);
						  	  this.setState( newLikeStatus );
						  }.bind(this),
						  error: function (err) {
						  			 	//do something with error
								 }
					  });
				  },
	render: function () {
				var text = this.state.liked ? "liked" : "haven't liked";
				return (
					<p onClick={this.handleClick}>
						You { text } this. Click to toggle
					</p>
					);
			}
});

module.exports = LikeButton;
