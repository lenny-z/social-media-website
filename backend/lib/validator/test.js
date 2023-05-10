const validator = require('./validator.js');
const util = require('@lenny_zhou/util')
const username = process.argv[2];
const reqsMet = validator.reqsMet(validator.username(username));
const allReqsMet = validator.allReqsMet(reqsMet);
console.log(`username: ${util.pretty(username)}`)
console.log(`reqsMet: ${util.pretty(reqsMet)}`);
console.log(`allReqsMet: ${allReqsMet}`)