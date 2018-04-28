var mongoose = require( 'mongoose' );
var user = require('./users');
var Schema = mongoose.Schema;
var contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contactnumber: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profileurl: {
    type: String,
    required: true
  },
  contacttype: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: { 
        type: Date,
        default: Date.now
    }
});
mongoose.model('Contact', contactSchema);
