const ldap = require('ldapjs');

function initServer() {
  const server = ldap.createServer();
  server.listen(1389, '127.0.0.1', () => {
    console.log('LDAP server listening at: ' + server.url);
  });
}

function connect() {
  const client = ldap.createClient({
    url: 'ldap://127.0.0.1:1389'
  });
  
  console.log("CONNECT RUNNING")
  client.bind('cn=root', 'secret', (err) => {
    console.log(err)
  });
}

function get() {
  console.log("CONNECT RUNNING")
  // client.bind('cn=root', 'secret', (err) => {
  //   assert.ifError(err);
  // });
}
  
function add() {
  console.log("ADD RUNNING")
  // const entry = {
  //   cn: 'foo',
  //   sn: 'bar',
  //   email: ['foo@bar.com', 'foo1@bar.com'],
  //   objectclass: 'fooPerson'
  // };
  //
  // client.add('cn=foo, o=example', entry, (err) => {
  //   assert.ifError(err);
  // });
}
  
function del() {
  console.log("DEL RUNNING")
  // client.del('cn=foo, o=example', (err) => {
  //   assert.ifError(err);
  // });
}

module.exports.connect = connect;
module.exports.get = get;
module.exports.add = add;
module.exports.del = del;
module.exports.initServer = initServer;