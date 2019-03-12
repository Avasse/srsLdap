const ldap = require('ldapjs');

const client = ldap.createClient({
    url: 'ldap://ldapserver:389'
});

function connect(login, password) {
  client.bind(login + ',dc=bla,dc=com', password, (err) => {
    if (!err) console.log('CONNECTED')
    else console.log(err)
  })
}

module.exports.connect = connect;
module.exports.client = client;