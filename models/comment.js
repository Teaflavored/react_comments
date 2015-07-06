var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	author: String,
	text: String,
	updated_at: Date,
	created_at: Date
});


commentSchema.pre("save", function(next){
	var currentDate = new Date();
	this.updated_at = currentDate;
	if (!this.create_at) {
		this.created_at = currentDate;
	}

	next();
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
