//パッケージ読み込み
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let config = require('config');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(config.db_path);

//DB情報
//ユーザID問い合わせ
try{
  db.serialize(function() {
    //仮登録テーブル
    // テーブルがなければ作成
    // user_id:       ユーザーID(TEXT 主キー)
    // full_name:     氏名(TEXT)
    // student_number:学籍番号(INT)
    // display_name:  表示名(TEXT)
    db.run('CREATE TABLE IF NOT EXISTS provisional_user(user_id TEXT NOT NULL PRIMARY KEY, full_name TEXT NOT NULL, student_number INT NOT NULL, display_name TEXT NOT NULL)');
    
    //本登録テーブル
    // student_number: 学籍番号(INT 主キー)
    // full_name:      氏名(TEXT)
    // user_id:        ユーザーID(TEXT)
    // display_name:   表示名(TEXT)
    // attendance_flag:出席フラグ(INT)
    db.run('CREATE TABLE IF NOT EXISTS user(student_number INT NOT NULL PRIMARY KEY, full_name TEXT NOT NULL, user_id TEXT NOT NULL, display_name TEXT NOT NULL, attendance_flag INT NOT NULL)');
  
    //報告テーブル
    // report_id :        インデックス(INT 主キー 自動発番)
    // report_category :  報告種別(INT)
    // attendance_time :  出席時間(INT)
    // full_name :        フルネーム(TEXT) 
    // report_detail :    報告内容(TEXT)
    // report_time :      報告日時(TEXT)
    // user_id :          ユーザID(TEXT) 
    db.run('CREATE TABLE IF NOT EXISTS reports(report_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, report_category INT NOT NULL, attendance_time INT NOT NULL, full_name TEXT NOT NULL, report_detail TEXT NOT NULL, report_time TEXT NOT NULL, user_id TEXT NOT NULL)');


  });
}
catch(err){
  console.log('------------------------------');
  console.log('------------ERROR-------------');
  console.log('------------------------------');
  console.log(err.name + ': ' + err.message);
  console.log('------------------------------');
 
}
finally{
  console.log('------------------------------');
  console.log('------------FINALLY-----------');
  console.log('------------------------------');
  db.close();
  console.log('------------------------------');
}

//ページ
const auth = require('./routes/auth');
const index = require('./routes/index');
const signUp = require('./routes/signUp');
const users = require('./routes/users');
const report = require('./routes/report');
const adminMain = require('./routes/adminMain');
const adminApplicationApproval = require('./routes/adminApplicationApproval');
const adminReportList = require('./routes/adminReportList');


// var samplesRouter = require('./routes/samples');  



var app = express();

// view engine setup
// console.log(path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルーティング
app.use('/', index);
app.use('/users', users);
app.use('/report', report);
app.use('/auth', auth);
app.use('/signUp', signUp);
app.use('/adminMain', adminMain);
app.use('/adminApplicationApproval', adminApplicationApproval);
app.use('/adminReportList', adminReportList);
// app.use('/samples', samplesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    title: 'エラー',
    error_h1_title : res.locals.message,
    message:res.locals.message
  });
});

module.exports = app;
