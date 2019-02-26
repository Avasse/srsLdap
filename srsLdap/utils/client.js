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

module.exports.connect = connect;
module.exports.client = client;