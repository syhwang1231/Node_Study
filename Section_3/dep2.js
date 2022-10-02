const dep1 = require('./dep1');  // {} 빈 객체
console.log('require dep1', dep1);
module.exports = () => {
    console.log('dep1', dep1);
}