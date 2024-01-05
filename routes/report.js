let express = require('express');
let router = express.Router();
let config = require('config');
let moment = require("moment");

//----------------------------------
// ユーザがアクセス
//----------------------------------
//DB情報
const dbAccessor = require('../db/user_table_accessor');
/* GET users listing. */
router.get('/', function(req, res, next) {
    
    const userId = req.query.userId;
    const displayName = req.query.displayName;
    // mySqlに通信しユーザIDが存在するかチェック
    // 無し：登録してください
    // 有り：入力フォームのページに遷移
    
    //ユーザID問い合わせ
    try{
        dbAccessor.userSelect(userId)
        .then(userSelect => {
            //指定ユーザの登録情報確認
            if(userSelect.length === 0){
                //利用申請
                res.render('signUp', {
                    title  : '申請',
                    userId : userId,
                    displayName: displayName,
                    iconUrl : profile.pictureUrl,
                    LiffId: config.Line.LiffId
                });
                
            }
            //報告があった場合は全表示(遅刻と欠席でタブ分け)
            else{
                res.render('report', {
                    title : '報告',
                    reportCategory: config.ReportCategory,
                    userId: userId,
                    displayName: displayName,
                    LiffId: config.Line.LiffId
                });
            }
        })
        .catch(err=>{
            //エラーページレンダリング
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
    }
    
    
});

router.post('/', function(req, res, next) {
    
    const userId = req.body.userId;
    const displayName = req.body.displayName;
  
    //ユーザID問い合わせ
    try{
        dbAccessor.userSelect(userId)
        .then(userSelect => {
            //指定ユーザの登録情報確認
            if(userSelect.length === 0){
                //利用申請させる
                res.render('signUp', {
                    title  : '申請',
                    userId : userId,
                    displayName: displayName,
                    iconUrl : profile.pictureUrl,
                    LiffId: config.Line.LiffId
                });
                
            }
            else{
                let wkTime = moment().format();
                let idx = wkTime.indexOf('T');
                let today = wkTime.slice(0,idx);

                let param = {
                    'report_category': parseInt(req.body.reportCategory),
                    'attendance_time': parseInt(req.body.attendanceTime),
                    'full_name'      : userSelect[0].full_name,
                    'report_detail'  : req.body.reportDetail,
                    'report_time'    : today,
                    'userId'         : userId
                };

                dbAccessor.insertReportData(param)
                .then(result =>{
                    res.render('message', {
                        title  : '結果',
                        textMain:'報告しました。',
                        LiffId: config.Line.LiffId
                    });
                })
                .catch(err =>{
                    res.render('message', {
                        title  : '結果',
                        textMain:'報告出来ませんでした。',
                        LiffId: config.Line.LiffId
                    });
                })
                
            }
        })
        .catch(err=>{
            //エラーページレンダリング
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
    }
    
    
});


module.exports = router;
