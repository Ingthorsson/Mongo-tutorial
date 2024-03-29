const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done)=>{
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('warning', error);
        });
});

//{ useMongoClient: true }
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections; //es6
    users.drop(() =>{
        comments.drop(() =>{
            blogposts.drop(()=>{
                done();
            });
        });
    });
});