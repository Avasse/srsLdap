const { client } = require('./client');

function getAllGroups() {
  const opts = {
    scope: 'sub'
  };

  return new Promise(function(resolve, reject) {
    client.search('ou=group,dc=bla,dc=com', opts, function(err, res) {
      let groups = [];

      if (!err) console.log("SEARCH OK");
      else console.log(err);

      res.on('searchEntry', function(entry) {
        console.log(entry);

        if(entry.object) {
          groups.push(entry.object);      
        }
      });

      res.on('error', (err) => console.error('error search: ' + err.message));
      res.on('end', (result) => resolve(groups) );
    });
  })
}

// async function addGroup(group) {
//   console.log("RUNNING ADD GROUP --------------------------------");
//   const dn = 'cn=' + entry.uid + ',ou=group,dc=bla,dc=com'

//   return new Promise(function(resolve, reject) {
//     client.add(dn, user, (error) => {
//       resolve({error: error, dn: dn})
//     })
//   })
// }
  
module.exports.getAllGroups = getAllGroups;