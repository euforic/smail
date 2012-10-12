var express = require('express')
  , app = express()
  , Smail = require('../');


Smail.debug = true;

Sms = Smail.Smail;

var sms = new Sms({from:'test@email.com'});

app.use(express.cookieParser());
app.use(express.bodyParser());

// API Base
app.get('/', function(req, res) {
  res.send({version:'0.0.1',status:'online'});
});

// Send Text
app.post('/text', function(req, res) {
  var to = req.body.to;
  var text = req.body.text;

  if (!to || !text) {
    res.send({success:false,response:'To and Text parameters are required.'});
    return;
  }
  var number = stripPhone(to);
  if (to.length < 9 || to.length > 10) {
    res.send({success:false,response:'Invalid phone number.'});
    return;
  }
  sms.send({ to: to, text: text }, function(err) {
    if (err) {
      res.send({success:false,response:'Communication with SMS gateway failed.'});
    } else {
      res.send({success:true});
    }
  });
});

function dateStr() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
}

function stripPhone(phone) {
  return (phone+'').replace(/\D/g, '');
}

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on', port);
});