const config = require('@jwerre/secrets').configSync({
    region: 'eu-west-1',
    id: 'MasterUser-demouser',
});

console.log(config)
