var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb://localhost/todos-list', {useNewUrlParser: true});

mongoose.Promise = Promise;
module.exports.Todo = require('./todos');
