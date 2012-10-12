
/**
 * Module dependencies.
 */
var exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , providerList = require('./providers');


/**
 * Expose the root command.
 */
exports = module.exports =  smail;

/**
 * Expose `Smail`.
 */
exports.Smail = Smail;

/**
 * noop
 */
var noop = function(){};

/**
 * Debug Mode
 */
exports.debug = false;

/**
 * Debug Logger
 * @param  {string} to
 * @param  {string} from
 * @param  {string} text
 * @param  {string} carrier
 * @api private
 */
function _debug( to, from, text, carrier) {
  if(!exports.debug){ return; }
  console.log('\n \033[34m [Smail Debug] \033[0m',
    '\n \033[34m To:\033[0m',to,
    '\n \033[34m From:\033[0m',from,
    '\n \033[34m Text:\033[0m',text,
    '\n \033[34m Carrier:\033[0m',carrier
  );
}

/**
 * Initialize a new `Smail`.
 *
 * @param {Object} options
 * @api public
 */
function Smail(options){
  if('object' !== typeof options){ return this; }
  this.to = options.to;
  this.from = options.from;
  this.text = options.text;
  this.carrier = options.carrier;
}

/**
 * Send SMS
 * @param  {Object}   msg
 * @param  {Function} fn
 * @api public
 */
Smail.prototype.send = function(msg, fn) {
  var callback = fn||noop;
  var to = msg.to||this.to;
  var from = msg.from||this.from;
  var text = msg.text||this.text;
  var carrier = msg.carrier||this.carrier||'unknown';

  if(providerList[carrier]) {
    var email = providerList[provider].replace('%s', to);
    sendEmail(to,from,text,callback);
    _debug(email,from,text,carrier);
  } else {
    // Cycle through provider list list
    var carriers = Object.keys(providerList);
    carriers.forEach(function(carrier) {
      var email = providerList[carrier].replace('%s', to);
      sendEmail(email,from,text,callback);
      _debug(email,from,text,carrier);
    });
  }
};

/**
 * Return new Smail Instance
 * @param  {Object} options
 * @return {Smail}
 * @api public
 */
function smail(options){
  return new Smail(options);
}

/**
 * Sends Email via Sendmail
 * @param  {String} to
 * @param  {String} from
 * @param  {String} message
 * @api private
 */
function sendEmail( to, from, message, callback ) {
  var child = spawn('sendmail', ['-f', from, to]);
  child.stdout.on('data', console.log);
  child.stderr.on('data', console.log);
  child.on('error', function(data) {
    callback(1,data);
  });
  child.on('exit', function(code, signal) {
    callback(code,signal);
  });
  child.stdin.write(message + '\n.');
  child.stdin.end();
}