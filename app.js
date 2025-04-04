require('dotenv').config();
const express=require('express');
const app=express();
const PORT=3000;
const path=require('path');
const routes=require('./routes/index');
const cookieParser=require('cookie-parser');
const expressLayout=require('express-ejs-layouts');
//using json in body of the requests
app.use(express.json());
//using cookies
app.use(cookieParser())
app.use(expressLayout)
app.set('layout','layout');
app.set('view engine','ejs');
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static('public/js'));
app.use('/images',express.static('public/assets'));


app.use('/', routes);

app.listen(PORT,()=>{
    console.log(`App is listening on http://localhost:${PORT}`);
})