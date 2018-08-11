const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {


    it('Requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;

        assert(message === 'Name is required.');
    });

    it('Requires a user name longer than 2 characters', () => {
        const user = new User({ name: 'al' });
        const validationResult = user.validateSync();
        const message = validationResult.errors.name.message;

        assert(message === 'Name must be longer than 2 characters.');
    });

    it('disallows invalid records from being saved', () => {
        const user = new User({ name: 'al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === 'Name must be longer than 2 characters.');
            })
    });
});