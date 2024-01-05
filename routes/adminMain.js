let express = require('express');
let router = express.Router();
let config = require('config');
let admin_cache = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.userId);
    console.log(req.query.displayName);
    const userId = req.query.userId;
    const displayName = req.query.displayName;

    //ユーザIDが無ければエラーページを返却
    if(req.query.userId === ''){
        //エラー処理
        console.log('')
    }
    //以前に一度ログインしていた場合
    else if(admin_cache.indexOf(userId) !== -1){
        res.render('adminMain', {
            title : 'メインページ',
            reportCategory  : config.ReportCategory,
            LiffId: config.Line.LiffId
            // message: message
        });
    }
    else{
        res.render('adminLogin', {
            title : 'ログイン画面',
            userId : userId,
            displayName: displayName,
            LiffId: config.Line.LiffId,
            message:'',
            // subMessage: count+'回失敗するとポア'
        });
    }
    
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
