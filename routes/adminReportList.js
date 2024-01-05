let express = require('express');
let router = express.Router();
let config = require('config');
const line = require('@line/bot-sdk');
let moment = require("moment");

// let wkTime = moment().format();
// let idx = wkTime.indexOf('T');
// let nowTime = wkTime.slice(0,idx);

// console.log(nowTime);
//-------------------------------------------------------------------
// create LINE SDK config from env variables
//-------------------------------------------------------------------
const config_line = {
    channelAccessToken: config.Line.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: config.Line.LINE_CHANNEL_SECRET,
};

//-------------------------------------------------------------------
// create LINE SDK client
//-------------------------------------------------------------------
const client = new line.Client(config_line);

//DB情報
const dbAccessor = require('../db/user_table_accessor');

//----------------------------------
// 教師がアクセス(生徒の報告を一覧表示)
//----------------------------------

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    //ユーザID問い合わせ
    try{
        dbAccessor.reportGetALL()
        .then(res => {
            //遅刻
            let tardy = [];
            //欠席
            let absence = [];
            //当日の日付取得後DB内の報告データから
            //日付が一致しているものを表示
            let wkTime = moment().format();
            let idx = wkTime.indexOf('T');
            let today = wkTime.slice(0,idx);

            //タブ分けするために、当日の遅刻と欠席のデータを分ける
            res.forEach(elem => {
                //当日のデータのみ処理
                if(elem.report_time === today){
                    //遅刻判定
                    if(elem.report_category === 0){
                        tardy.push(elem);
                    //欠席
                    }else if(elem.report_category === 1){
                        absence.push(elem)
                    }
                }
            });

            //情報がない場合の処理
            if(tardy.length === 0 && absence.length === 0){
                
            }
            //情報があった場合タブ分けで表示
            else{
                res.render('adminReportList', {
                    title  : '報告一覧',
                    tardy  : tardy,
                    absence: absence,
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

module.exports = router;
