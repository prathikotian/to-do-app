let mongoose = require('mongoose'),
    DB = process.env.DB || 'mongodb://localhost/todos-list';

mongoose.set('debug', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect(DB, {useNewUrlParser: true});

mongoose.Promise = Promise;
module.exports.Todo = require('./todos');
