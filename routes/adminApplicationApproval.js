let express = require('express');
let router = express.Router();
let config = require('config');
let admin_cache = [];

//DB情報
const dbAccessor = require('../db/user_table_accessor');

//------------------------------------
// 教師がアクセス(生徒の利用申請を承認する)
//------------------------------------

/* GET users listing. */
router.get('/', function(req, res, next) {
    // console.log(req.query.userId);
    // console.log(req.query.displayName);
    // const userId = req.query.userId;
    // const displayName = req.query.displayName;
   
    dbAccessor.userGetALL()
    .then(userGetALLResult =>{


        //仮登録0人
        if(userGetALLResult.length === 0){
        //いた場合
        }else{
            
            res.render('adminApplicationApproval', {
                title : '利用申請承認',
                reportCategory  : config.ReportCategory,
                LiffId: config.Line.LiffId,
                usersArray:userGetALLResult
            });
        }
        
    })
    .catch(err =>{
        console.log(err);
    });
    
});

router.post('/', function(req, res, next) {
    console.log(req.body.userId);
    console.log(req.body.displayName);
    const userId = req.body.userId;
    const displayName = req.body.displayName;

    //ユーザIDが無ければエラーページを返却
    if(req.query.userId === '' || req.query.userId === ''){
        //エラー処理
        console.log('')
    }
    //ログイン画面表示
    //ログインIDとパスワード
    if(req.body.login_id === config.Line.ADMIN_ID && req.body.password === config.Line.ADMIN_PASS){
        //userIdをキャッシュ
        admin_cache.push(userId);

        res.render('adminMain', {
            title : 'メインページ',
            reportCategory  : config.ReportCategory,
            LiffId: config.Line.LiffId
            // message: message
        });
    }else{
        let count = 5;
        res.render('adminLogin', {
            title : 'ログイン画面',
            userId : userId,
            displayName: displayName,
            LiffId: config.Line.LiffId,
            message:'ログインに失敗しました',
            // subMessage: count +'回失敗するとポア'
            // message: message
        });
    }
   
    
});

module.exports = router;
