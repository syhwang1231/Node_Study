const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port', 3000);  // 서버에 속성을 심는 것임

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'zerochopassword',  // 쿠키랑 비슷하게
    cookie: {  // 세션 쿠키에 대한 설정
        httpOnly: true,  // 자바스크립트에 공격을 안 당하도록
    },
    name: 'connect.sid',  // 기본값이 connect.sid
}));  // 세션 

app.use((req, res, next) => {
    console.log("1 요청에 실행하고 싶어요");
    next();
}
// , (req, res, next) => {
//     try{
//         console.log("asdfawfwer");
//     }
//     catch(error){
//         next(error);
//     }
// }
);

app.get('/', (req, res, next)=>{
    req.cookies // { mycookie: 'test' }
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly: true,
        path: '/',
    });
    res.sendFile(path.join(__dirname, './index.html'));
    next('route');
}, (req, res) => {
    console.log('실행되나요?');
});

app.get('/', (req, res)=>{
    console.log('실행되지롱');
});

app.get('/category/javascript', (req, res)=>{
    res.send("hello javascript");
});

app.get('/category/:name', (req, res)=>{
    res.send("hello wildcard");
});

app.get('/about', (req, res)=>{
    res.send("hello express!");
});

// app.get('*', (req, res)=>{  // get요청에 대한 어떤 주소던지 처리함 -> 이게 맨 위에 있으면 큰일남
//     res.send("hello everybody");
// });

app.use((req, res, next) => { 
    res.send('404 error!');
});

// 에러 처리 미들웨어
// 에러 미들웨어는 앞에 err, 반드시 next까지 총 4개의 매개변수 필요
app.use((err, req, res, next) => {
    console.error(err);
    res.status(200).send("에러 났음");
});

app.listen(app.get('port'), () => {  // 위에서 저장한 속성 여기서 꺼내서 사용
    console.log('익스프레스 서버 실행');
})