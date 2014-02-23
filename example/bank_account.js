var balanced = require('../lib/balanced'),
    config   = require('./definitions');

var b = balanced.init(config.secret, config.marketplace_uri);

// Invalid Test
new b.bank_account().create({
  account_number: '8887776665555',
  routing_number: '100000007',
  name: 'Landon Williams',
  type: 'checking'
}, function(err, res) {
  if(err) {
    return console.log(err);
  }
  
  console.log(res);
});

// Valid Test
new b.bank_account().create({
  account_number: '9900000002',
  routing_number: '021000021',
  name: 'Landon Williams',
  type: 'checking'
}, function(err, res) {
  if(err) {
    return console.log(err);
  }
  
  console.log(res);
  // Now get an account by ID
  new b.bank_account(res.uri).id(function(err, bankAccount) {
    if(err) {
      return console.log(err);
    }
    
    console.log(bankAccount);
    // new customer
    new b.customer().create({
      name: 'John Doe'
    }, function(err, customer) {
      if(err) {
        return console.log(err);
      }
      
      console.log(customer);
      // add bank to customer
      new b.customer(customer.uri).add_bank({
        bank_account_uri: bankAccount.uri
      }, function(err, res) {
        if(err) {
          return console.log(err);
        }
        
        console.log(res);
      });
    });
  });
});