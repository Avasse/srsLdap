const ldap = require('ldapjs');

const client = ldap.createClient({
    url: 'ldap://127.0.0.1:389'
});

function connect() {
  client.bind('cn=admin,dc=bla,dc=com', 'bla', (err) => {
    if (!err) console.log("CONNECTED");
    else console.log(err);
  })
}

function getAllUsers() {
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

      res.on('error', (err) => console.error('error search: ' + err.message));
      res.on('end', (result) => resolve(users) );
    });
  })
}

function getOneUser(dn) {
  const opts = {
    scope: 'base'
  };

  return new Promise(function(resolve, reject) {
    client.search(dn, opts, function(err, res) {
      let user = null;

      if (!err) console.log("SEARCH OK");
      else console.log(err);

      res.on('searchEntry', (entry) => user = entry.object);
      res.on('error', (err) => console.error('error search: ' + err.message));
      res.on('end', (result) => resolve(user))
    })
  })
}

function addUser(userObject) {
  const entry = {
    objectClass: ['top','person','organizationalPerson','inetOrgPerson','posixAccount','shadowAccount', 'gamer'],
    sn: userObject.sn,
    givenName: userObject.givenName,
    cn: userObject.cn,
    userPassword: userObject.userPassword,
    homeDirectory: userObject.homeDirectory,
    uidNumber: getNextUid(),
    gidNumber: getNextUid(),
    loginShell: userObject.loginShell,
    uid: userObject.uid,
    pseudo: userObject.pseudo,
    age: userObject.age,
    games: userObject.games,
    steamAccount: userObject.steamAccount,
    mail: userObject.mail
  };

  let dn = 'uid=' + entry.uid + ',cn=admin,dc=bla,dc=com';
  // if(userObject.group != 'admin') {
  //   dn = 'uid=' + entry.uid + ',ou=' + userObject.group + ',dc=bla,dc=com';
  // }
  
  return new Promise(function(resolve, reject) {
    client.add(dn, entry, (error) => {
      resolve({error: error, dn: dn})
    })
  })
}
  
function deleteUser(dn) {
  return new Promise(function(resolve, reject) {
    client.del(dn, (error) => {
      resolve(error)
    })
  })
}

function updateUser(userObject) {
  var modifications = new ldap.Change({
    operation: 'replace',
    modification: {
      sn: userObject.sn,
      givenName: userObject.givenName,
      cn: userObject.cn,
      userPassword: userObject.userPassword,
      homeDirectory: userObject.homeDirectory,
      loginShell: userObject.loginShell,
      uid: userObject.uid,
      pseudo: userObject.pseudo,
      age: userObject.age,
      games: userObject.games,
      steamAccount: userObject.steamAccount,
      mail: userObject.mail
    }
  })

  return new Promise(function(resolve, reject) {
    client.modify(userObject.dn, modifications, (error) => {
      resolve({error: error, dn: userObject.dn})
    })
  })
}

function getMaxUid() {
  let uids = [];
  client.search('dc=bla,dc=com', opts, function(err, res) {
    if (!err) console.log("SEARCH OK");
    else console.log(err);

    res.on('searchEntry', function(entry) {
      if(entry.object.uidNumber) {
        uids.push(entry.object.uidNumber);
      }
      if(entry.object.gidNumber) {
        uids.push(entry.object.gidNumber);
      }
    });
  });
  return uids.reduce((prev, current) => (prev > current) ? prev : current);
}

function getNextUid() {
  return getMaxUid() + 1;
}

module.exports.getAllUsers = getAllUsers;
module.exports.getOneUser = getOneUser;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;

module.exports.connect = connect;