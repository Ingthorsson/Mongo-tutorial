const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{title: 'Post title'}]
         });
         joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title  === 'Post title');
                done();
            });
    });

    it('can add a subdocuments to a user', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            postCount: 0,
            posts: []
         });

         joe.save()
            .then(() => User.findOne({ name: 'Joe' })) // same as .then(() =>{ return User.findOne({ name: 'Joe' }) }) 
            .then((user) => {
                user.posts.push({title:'New Post'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title  === 'New Post');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const joe = new User({ 
            name: 'Joe', 
            postCount: 0,
            posts: [{title: 'New Title'}]
         });
         joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length  === 0);
                done();
            });
    });

});