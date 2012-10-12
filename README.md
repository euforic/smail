# Smail - Free sms client
Smail is a SMS texting API that uses carrier-specific gateways to deliver SMS messages via Sendmail.
No dependencies or 3rd party APIs required.

## Requirements
  - Node.js
  - Sendmail

## Installing
```bash
$ npm install smail
```

## Usage

```javascript
// Require the module
var smail = require('smail');

// Message parameters
var options = {
  to: '5554446666',
  from:'5551112222',
  text:'Test SMS from Smail'
  // If you already know the carrier set the optional parameter
  // For a list of carrier names see `lib/providers`
  //carrier:'CARRIER_NAME'
};

// Create new smail instance
var sms = smail(/*Optional option defaults object*/);


// Send the SMS
// Options passed to send will override th default options for the message
sms.send(options,function(err){
  // Do something...
});
```

## Custom Providers List
TODO


## Supported Carriers
Carrier list is located in `lib/providers`
 - U.S. Providers
  - Alltel, Ameritech, AT&T Wireless, Boost, CellularOne, Cingular, Edge Wireless, Sprint PCS, Telus Mobility, T-Mobile, Metro PCS, Nextel, O2, Orange, Qwest, Rogers Wireless, US Cellular, Verizon, Virgin Mobile.

## License

(The MIT License)

Copyright (c) 2012 Christian Sullivan &lt;cs@euforic.co&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.