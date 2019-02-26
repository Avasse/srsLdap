const ldap = require('ldapjs');
const { client } = require('./client');

function getAllUsers() {
  const opts = {
    scope: 'sub'
  };

  return new Promise(function(resolve, reject) {
    client.search('ou=people,dc=bla,dc=com', opts, function(err, res) {
      let users = [];
      res.on('searchEntry', (entry) => users.push(entry.object));
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
      res.on('searchEntry', (entry) => user = entry.object);
      res.on('error', (err) => console.error('error search: ' + err.message));
      res.on('end', (result) => resolve(user))
    })
  })
}

async function addUser(user) {
  const dn = 'uid=' + user.uid + ',ou=people,dc=bla,dc=com'
  const userUid = await getNextUid();
  user.uidNumber = userUid;
  user.gidNumber = userUid;
  user.objectClass = ['top','person','organizationalPerson','inetOrgPerson','posixAccount','shadowAccount', 'gamer'];
  
  return new Promise(function(resolve, reject) {
    client.add(dn, user, (error) => {
      resolve({error: error, dn: dn})
    })
  })
}
  
function deleteUser(dn) {
  return new Promise(function(resolve, reject) {
    client.del(dn, (err) => {
      if (err) reject(err)
      else resolve(err)
    })
  })
}

function updateUser(user) {
  const labels = ['sn','givenName', 'cn', 'userPassword', 'homeDirectory', 'loginShell', 'uid', 'pseudo', 'age', 'games', 'steamAccount', 'mail']
  const modifications = []
  
  labels.forEach(key => {
    modifications.push(new ldap.Change({
      operation: 'replace',
      modification: {
        [key]: user[key]
      }
    }))
  })

  return new Promise(function(resolve, reject) {
    client.modify(user.dn, modifications, (error) => {
      resolve({error: error, dn: user.dn})
    })
  })
}

async function getNextUid() {
  const users = await getAllUsers();
  return Math.max.apply(Math, users.map(user => { return user.uidNumber ? user.uidNumber : 0 ; })) + 1  
}

module.exports.getAllUsers = getAllUsers;
module.exports.getOneUser = getOneUser;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;