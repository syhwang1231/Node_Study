const { odd, even } = require('./var');
const checkNumber = require('./func');  // checkNumber는 변수명이기 때문에 checkOddOrEven이 아니어도 됨(구조분해 할당 시에는 똑같아야 함. - line 1)

function checkStringOddOrEven(str){
    if(str.length % 2){
        return odd;
    }
    else{
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));