var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
    var user = new Schema({
        userName  : String ,
        password  : String
    });
    mongoose.model("User", user);
};
