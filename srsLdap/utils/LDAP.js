const ldap = require('ldapjs');

const client = ldap.createClient({
    url: 'ldap://127.0.0.1:389'
});

function connect() {
  client.bind('cn=admin,dc=bla,dc=com', 'bla', (err) => {
    if (!err) console.log("CONNECTED");
    else console.log(err);
  });
}

function get() {
  const opts = {
    scope: 'sub'
  };

  return new Promise(function(resolve, reject) {
    client.search('dc=bla,dc=com', opts, function(err, res) {
      let users = [];

      if (!err) console.log("SEARCH OK");
      else console.log(err);

      res.on('searchEntry', function(entry) {
        if(entry.object.givenName) {
          users.push(entry.object);      
        }
      });

      res.on('error', function(err) {
        console.error('error search: ' + err.message);
      });

      res.on('end', function(result) {
        console.log('users: ' + users);
        resolve(users);
      });
    });
  })
}

function add() {
  console.log("ADD RUNNING");
  const entry = {
    objectClass: ['top','person','organizationalPerson','inetOrgPerson','posixAccount','shadowAccount'],
    givenName: 'JEAN PIERRE',
    sn: 'JEAN PIERRE',
    cn: 'JEAN PIERRE',
    userPassword: 'JEAN PIERRE',
    homeDirectory: '/home/jp',
    loginShell: '/bin/bash',
    uidNumber: 1201,
    gidNumber: 1201
  };
  
  client.add('uid=jeanpierre,cn=admin,dc=bla,dc=com', entry, (err) => {
    console.log(err);
  });
}
  
function del() {
  console.log("DEL RUNNING");
  client.del('uid=jeanpierre,cn=admin,dc=bla,dc=com', (err) => {
    console.log(err);
  });
}

function update() {
  var change = new ldap.Change({
    operation: 'replace',
    modification: {
      givenName: "JPP2"
    }
  });

  client.modify('uid=jeanpierre,cn=admin,dc=bla,dc=com', change, (err) => {
    if (!err) console.log("UPDATED");
    else console.log(err);
  })
}

module.exports.connect = connect;
module.exports.get = get;
module.exports.add = add;
module.exports.del = del;
module.exports.update = update;