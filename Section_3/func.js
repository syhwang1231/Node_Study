// func.js 에서 var.js 불러오는 것(js 생략 가능)
//const value = require("./var")  // node에서 제공하는 함수 require()
const { odd, even } = require("./var");

function checkOddOrEven(number) {
    if(number % 2){
        return odd;
    }
    else{
        return even;
    }
}

module.exports = checkOddOrEven;