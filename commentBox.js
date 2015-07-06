var React = require("react");
var CommentList = require("./commentList");
var CommentForm = require("./commentForm");
var $ = require("jquery");

var CommentBox = React.createClass({
	getInitialState : function () {
							return { data: [] };
						},
	componentDidMount: function () {
						   $.ajax({
								url: this.props.url,
								dataType: "json",
								cache: false,
						 		success: function (data) {
									this.setState( { data: data } );
								}.bind(this),
								error: function (xhr, status, err) {
									console.error(this.props.url, status, err.toString());
								}.bind(this)
						   });
					   },
	handleCommentSubmit: function (comment) {
							 console.log(comment);
							 $.ajax({
								 "url": this.props.url,
							 	 "type": "POST",
							 	 "dataType": "json",
							 	 "contentType" : "application/json",
							 	 "data": JSON.stringify(comment),
								 "success": function (data) {
									 this.setState( { data: data } )
								 }.bind(this),
								 "error": function(xhr, status, err) {
									 console.error(this.props.url, status, err.toString());
								 }.bind(this)
							 });
						 },
	render: function () {
				return (
					<div className="commentBox">
						<h1>Comments</h1>
						<CommentList data={ this.state.data }/>
						<CommentForm onCommentSubmit={ this.handleCommentSubmit }/>
					</div>
					);
			}
});

module.exports = CommentBox;
