

var user = require('./user');
module.exports.initialize = function() {
  return {
    User : user()
  };
}
