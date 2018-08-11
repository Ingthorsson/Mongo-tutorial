const assert = require('assert');
const User = require('../src/user');
// const Comment = require('../src/comment');
// const BlogPost = require('../src/blogPost');

describe('Virtual types', () => {

    it('Postcount returns number of posts', (done) => {
        const joe = new User({ 
            name: 'Joe',
            posts: [{title: 'PostTitle'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.postCount  === 1);
                done();
            });
    });

});