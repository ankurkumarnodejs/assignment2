var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Contact = require('../models/Contact');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {


  var user = new User();

  user.username = req.body.username;
  user.contactnumber = req.body.contactnumber;
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};


module.exports.addContact = function(req, res){
  var contacts = req.body.contacts;
   console.log(req.body);
   Contact.collection.insert(contacts, (err, docs) => {
      if (err){ 
        console.log(err);
         res.json({error:true, message: err})
      } else {
        console.log(docs);
         res.json({error:false, message: 'Inserted data.'})
        

      }
    });
}
module.exports.listContact = function(req, res){
   Contact.find({userId: req.body.userId}, (err, docs) => {
      if (err){ 
          res.json({error:true, message: err})
      } else {
          res.json({error:false, message: docs})
      }
    });
}

module.exports.updateContact = function(req, res){
   var fields = req.body;
   Contact.update({userId: req.body.userId}, {fields} , {new : true}, (err, docs) => {
      if (err){ 
          res.json({error:true, message: err})
      } else {
          res.json({error:false, message: docs})
      }
    });
}

module.exports.check = function(req, res) {
  User.find(req.body, (err, data)=>{
   if(err){
   res.json({error: true, message : err})
   }else{
    if(data.length > 0){
        res.json({error : true, message : "Already exist."});
        }else{
        res.json({error : false, message : "Available."});
        }
   }
  });


  var user = new User();

  user.username = req.body.username;
  user.contactnumber = req.body.contactnumber;
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {


  passport.authenticate('local', function(err, user, info){
    var token;
    if (err) {
      res.status(404).json(err);
      return;
    }

    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);

};