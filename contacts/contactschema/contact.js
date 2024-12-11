const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const contactschema = new Schema(
    {
        title : {
            type : String ,
            required : true
        },
        snippet : {
            type : String ,
            required : true
        },
        body : {
            type : String ,
            required : true
        }
    },{timestamps : true}
);

const contact = mongoose.model('contact' , contactschema);
module.exports = contact ;
  