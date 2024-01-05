let express = require('express');
let router = express.Router();
let config = require('config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //ユーザ登録時
    if(req.query.process === 'signUp'){
        res.render('auth', {
            title : '',
            transitionUrl: config.serverInfo.URL + '/signUp',
            LiffId: config.Line.LiffId

        });
    }
    //遅刻欠席報告
    else if(req.query.process === 'report'){
        res.render('auth', {
            title : '',
            transitionUrl: config.serverInfo.URL + '/report',
            LiffId: config.Line.LiffId

        });
    }
    //ユーザの出席率チェック
    else if(req.query.process === 'attendanceRateCheck'){
        res.render('auth', {
            title : '',
            transitionUrl: config.serverInfo.URL + '/attendanceRateCheck',
            LiffId: config.Line.LiffId

        });
    }
    //  先生方のメインページ
    else if(req.query.process === 'adminMain'){
        res.render('auth', {
            title : '',
            transitionUrl: config.serverInfo.URL + '/adminMain',
            LiffId: config.Line.LiffId

        });
    }
    //　先生方が生徒の報告内容を閲覧できるページ
    else if(req.query.process === 'adminReportCheck'){
    
    }
    //　先生方が生徒の公欠情報を設定するページ
    else if(req.query.process === 'adminReportCheck'){

    }
    //　先生方が、生徒の申請情報を承認するページ
    else if(req.query.process === 'adminConfirmation'){
        

    }else{
        res.render('report', {
            title : 'エラー',
            message: '404 Not Found'
        });
    }
    
});

module.exports = router;
