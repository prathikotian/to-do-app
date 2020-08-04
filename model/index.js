var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.DB, {useNewUrlParser: true});

mongoose.Promise = Promise;
module.exports.Todo = require('./todos');
