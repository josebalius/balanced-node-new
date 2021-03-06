var https       = require('https'),
    fs          = require('fs'),
    util        = require('util'),
    async       = require('async'),
    balanced    = require('../lib/balanced'),
    config      = require('./definitions.js'),
    hostname    = 'api.balancedpayments.com',
    testDir     = '/run',
    testObjects = {
      marketplace_uri: config.marketplace_uri,
      secret: config.secret,
      complete: false
    }
    runners     = [],
    testers     = [];

for(var a = 2; a < process.argv.length; a++) {
  testers.push(process.argv[a]);
}
    
function main(callback) {
  balanced.init(config.secret, config.marketplace_uri);
  var tests = fs.readdirSync(__dirname + testDir);
  
  for(var i = 0; i < tests.length; i++) {
    if(testObjects.noDelete && tests[i] === 'cleanup') {
      console.log('no delete');
      continue;
    }
    if(testers.length > 0 && testers.indexOf(tests[i].substr(0, tests[i].length-3)) < 0) {
      console.log("Skipping " + tests[i]);
      continue;
    }
    runners.push(require(__dirname + testDir + '/' + tests[i]));
  }

  var objectArray = [];
  for(i = 0; i < runners.length; i++) {
    var runner = runners[i];
    testObjects[runner.variable] = {};
    var keys = Object.keys(runner.functions);
    for(var j = 0; j < keys.length; j++) {
      testObjects[runner.variable][keys[j]] = {};
      objectArray.push(createFunction(keys[j], runner));
    }
  }
  console.log('Please be patient, building tests...');
  async.series(objectArray, function(err, results) {
    if(!testObjects.noLog) {
      for(var j = 0; j < results.length; j++) {
        if(typeof results[j].error !== 'undefined') {
          console.log('\n\n----- Running: ' + results[j].name + ' -----\n\n');
          console.log('    -- [ERROR]' + results[j].func + ':\n');
          console.log(results[j].error);
          continue;
        }
        console.log('\n\n----- Running: ' + results[j].name + ' -----\n\n');
        console.log('    -- ' + results[j].func + ':\n');
        console.log(results[j].res);
      }
    }
    testObjects.complete = true;
  });
}

function createFunction(func, runner) {
  return function(callback) {
    var action = runner.functions[func];

    var data = null;
    var uriOptions = null;
    
    if(action.data) {
      data = action.data;
      var dataKeys = Object.keys(action.data);
      for(var i = 0; i < dataKeys.length; i++) {
        var d = action.data[dataKeys[i]];
        if(typeof d !== 'string') {
          continue;
        }
        if(d.indexOf(':') >= 0 && d.indexOf('://') === -1) {
          var variablePieces = d.substr(1).split('.');
          var newVar = testObjects;
          for(var j = 0; j < variablePieces.length; j++) {
            newVar = newVar[variablePieces[j]];
          }
          action.data[dataKeys[i]] = newVar;
        }
      }
    }
    if(action.uriOptions) {
      if(typeof action.uriOptions === 'string') {
        if(action.uriOptions.indexOf(':') >= 0 && action.uriOptions.indexOf('://') === -1) {
          var variablePieces = action.uriOptions.substr(1).split('.');
          var newVar = testObjects;
          for(var j = 0; j < variablePieces.length; j++) {
            newVar = newVar[variablePieces[j]];
          }
          uriOptions = newVar;
          console.log('URL Option replaced:' + newVar);
        }
      } else {
        uriOptions = action.uriOptions;
        var urlKeys = Object.keys(uriOptions);
        for(i = 0; i < urlKeys.length; i++) {
          var d = uriOptions[urlKeys[i]];
          if(typeof d !== 'string') {
            continue;
          }
          console.log('Trying to replace a url argument');
          console.log(urlKeys);
          console.log(d);
          if(d.indexOf(':') >= 0 && d.indexOf('://') === -1) {
            var variablePieces = d.substr(1).split('.');
            var newVar = testObjects;
            for(var j = 0; j < variablePieces.length; j++) {
              newVar = newVar[variablePieces[j]];
            }
            uriOptions[urlKeys[i]] = newVar;
            console.log('URL Option replaced:' + newVar);
          }
        }
      }
    }
    
    new balanced[action.module]()[action.method](uriOptions, data, function(err, res) {
      if(err) {
        var ret = {
          name: runner.name,
          func: func,
          error: err
        };
        callback(null, ret);
      } else {
        var ret = {
          name: runner.name,
          func: func,
          res: res
        }
        testObjects[runner.variable][func] = res;
        callback(null, ret);
      }
    });
  };
}

function createFunction_OLD(func, runner) {
  return function(callback) {
    var action = runner.functions[func];
    
    var pathPieces = action.path.split('/');
    /*
      Parse any URL variables here.
    */
    for(var i = 0; i < pathPieces.length; i++) {
      if(pathPieces[i].indexOf(':') >= 0) {
        var variablePieces = pathPieces[i].substr(1).split('.');
        var newVar = testObjects;
        for(var j = 0; j < variablePieces.length; j++) {
          newVar = newVar[variablePieces[j]];
        }
        pathPieces[i] = newVar;
        action.path = pathPieces.join('/');
      }
    }
    /*
      Parse any data variables here.
    */
    if(action.data) {
      var dataKeys = Object.keys(action.data);
      for(i = 0; i < dataKeys.length; i++) {
        var d = action.data[dataKeys[i]];
        if(typeof d !== 'string') {
          continue;
        }
        console.log(d[i].indexOf('://'));
        if(d.indexOf(':') >= 0 && d[i].indexOf('://') !== -1) {
          var variablePieces = d.substr(1).split('.');
          var newVar = testObjects;
          for(var j = 0; j < variablePieces.length; j++) {
            newVar = newVar[variablePieces[j]];
          }
          action.data[dataKeys[i]] = newVar;
        }
      }
    }
    new Request().request(action.path, action.method, action.data, function(err, res) {
      if(err) {
        var ret = {
          name: runner.name,
          func: func,
          error: err
        };
        callback(null, ret);
      } else {
        var ret = {
          name: runner.name,
          func: func,
          res: res
        }
        testObjects[runner.variable][func] = res;
        callback(null, ret);
      }
    });
  }
}

function Request() {
  $scope = this;
  
  $scope.request = function(path, method, data, callback) {
    var used_args = arguments;
  
    var q = JSON.stringify(data);
    if(q === undefined) {
      q = '';
    }
    
    method = method.toLowerCase();
    
    if(path.substr(0, 3) !== '/v' + config.api_version) {
      path = '/v' + config.api_version + '/' + path;
    }
    
    var opts = {
      host: hostname,
      path: path,
      method: method,
      port: 443,
      auth: config.secret + ':',
      headers: {
        'content-type': 'application/json',
        'accept': '*/*'
      }
    };
    
    if((method === 'post' || method === 'put') && q !== undefined) {
      opts.headers['content-length'] = q.length;
    }
    
    if(method === 'delete' || method === 'get') {
      opts.headers['content-length'] = 0;
    }
    
    var req = https.request(opts, function(sock) {
      var fullData = '';
      sock.setEncoding('utf-8');
      sock.on('data', function(chunk) {
        fullData += chunk;
      });
      
      sock.on('end', function() {
        try {
          if(fullData.length > 0) {
            var j = JSON.parse(fullData);
          }
        } catch(e) {
          return callback({
            error: e,
            message: 'Error on: [' + method + '] ' + path,
            details: fullData,
            arguments: used_args
          }, null);
        }
        
        if(typeof j === 'object') {
          if(j.status_code && j.status_code != 200) {
            j.arguments = used_args;
            return callback(j, null);
          }
        } else {
          j = {};
        }
        callback(null, j);
      });
    });
    
    req.on('error', function(e) {
      callback(e, null);
    });
    
    if(method === 'post' || method === 'put' || method === 'delete') {
      req.write(q, 'utf-8');
    }
    
    req.end();
  };
  
  return $scope;
}

main();

module.exports = testObjects;