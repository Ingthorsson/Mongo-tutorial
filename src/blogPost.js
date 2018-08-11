/*
*   BlogPost model
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});


const BlogPost = mongoose.model('user', BlogPostSchema);

module.exports = BlogPost;