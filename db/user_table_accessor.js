    
const config = require('config');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(config.db_path);

//---------------------------------------
// 仮登録テーブル操作
//--------------------------------------
//仮登録テーブルにデータ追加
//　データ挿入(仮テーブル)
module.exports.insertUserData = function (param){

    return new Promise(function (resolve, reject) {
        db.serialize(function () {

            db.run('insert into provisional_user (user_id, full_name, student_number, display_name) values ($a, $b, $c, $d)', 
                {
                    $a: param.userId,
                    $b: param.full_name,
                    $c: param.student_number,
                    $d: param.display_name
                },
                function (err, res) {
                    if (err){
                       reject(err);
                    }
                    resolve(res);
                }
            );
        });
    }); 
};

//　ユーザIDで検索
module.exports.userSelect = function (userId, callback) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            

            db.all('select * from provisional_user where user_id = ?' ,
                userId,
                   
                function (err, rows) {
                    if (err){
                        throw err;
                    }else{
                      
                        rows.forEach(function (row) {
                            callback(row);
                        });
                    }
                },
                function (err, res) {
                    if (err){
                        console.log('---------------------');
                        console.log('userSelect ERROR');
                        console.log(err);
                        console.log('---------------------');
                        return reject(err);
                    }else{
                        if (res.length == 0){
                            //ここでSQLの実行結果が0件の処理や
                            console.log('---------------------');
                            console.log('userSelect END');
                            console.log('---------------------');
                            resolve(res);
                        }else{
                            //処理や
                            resolve(res);
                        }
                        
                    }
                }
            );
        });
    });
};

//　すべてのユーザ情報を取得
module.exports.userGetALL = function (userId, callback) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            

            db.all('select * from provisional_user' ,
                userId,
                   
                function (err, rows) {
                    if (err){
                        throw err;
                    }else{
                      
                        rows.forEach(function (row) {
                            callback(row);
                        });
                    }
                },
                function (err, res) {
                    if (err){
                        console.log('---------------------');
                        console.log('userSelect ERROR');
                        console.log(err);
                        console.log('---------------------');
                        return reject(err);
                    }else{
                        if (res.length == 0){
                            //ここでSQLの実行結果が0件の処理や
                            console.log('---------------------');
                            console.log('userSelect END');
                            console.log('---------------------');
                            resolve(res);
                        }else{
                            //処理や
                            resolve(res);
                        }
                        
                    }
                }
            );
        });
    });
};

module.exports.insertReportData = function (param){
    // report_id :        インデックス(INT 主キー 自動発番)
    // report_category :  報告種別(INT)
    // attendance_time :  出席時間(INT)
    // user_id :          ユーザID(TEXT) 
    // report_detail :    報告内容(TEXT)
    // report_time :      報告日時(TEXT)
    return new Promise(function (resolve, reject) {
        db.serialize(function () {

            db.run('insert into reports (report_category, attendance_time, full_name, report_detail, report_time, user_id) values ($a, $b, $c, $d, $e, $f)', 
                {
                    $a: param.report_category,
                    $b: param.attendance_time,
                    $c: param.full_name,
                    $d: param.report_detail,
                    $e: param.report_time,
                    $f: param.userId
                },
                function (err, res) {
                    if (err){
                       reject(err);
                    }
                        resolve(res);
                }
            );
        });
    }); 
};


//---------------------------------------
// 本登録テーブル操作
//--------------------------------------
//　ユーザIDで検索
module.exports.userSelectHontoroku = function (userId, callback) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            

            db.all('select * from user where user_id = ?' ,
                userId,
                   
                function (err, rows) {
                    if (err){
                        throw err;
                    }else{
                      
                        rows.forEach(function (row) {
                            callback(row);
                        });
                    }
                },
                function (err, res) {
                    if (err){
                        console.log('---------------------');
                        console.log('userSelectAll ERROR');
                        console.log(err);
                        console.log('---------------------');
                        return reject(err);
                    }else{
                        if (res.length == 0){
                            //ここでSQLの実行結果が0件の処理や
                            console.log('---------------------');
                            console.log('userSelectAll END');
                            console.log('---------------------');
                            resolve(res);
                        }else{
                            //処理や
                            resolve(res);
                        }
                        
                    }
                }
            );
        });
    });
};

//---------------------------------------
// 報告テーブル操作
//--------------------------------------
//　すべてのユーザ情報を取得
module.exports.reportGetALL = function (userId, callback) {
    return new Promise(function (resolve, reject) {
        db.serialize(function () {
            

            db.all('select * from reports' ,
                userId,
                   
                function (err, rows) {
                    if (err){
                        throw err;
                    }else{
                      
                        rows.forEach(function (row) {
                            callback(row);
                        });
                    }
                },
                function (err, res) {
                    if (err){
                        console.log('---------------------');
                        console.log('reportGetALL ERROR');
                        console.log(err);
                        console.log('---------------------');
                        return reject(err);
                    }else{
                        if (res.length == 0){
                            //ここでSQLの実行結果が0件の処理や
                            console.log('---------------------');
                            console.log('reportGetALL END');
                            console.log('---------------------');
                            resolve(res);
                        }else{
                            //処理や
                            resolve(res);
                        }
                        
                    }
                }
            );
        });
    });
};

// module.exports = dbAccessor;