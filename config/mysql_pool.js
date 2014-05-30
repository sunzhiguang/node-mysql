/**
 * 配置数据库连接池
 * Created with JetBrains WebStorm.
 * User :  sunzhiguang
 * Date :  14-5-28.
 * Time :  下午3:44.
 */
var mysql   = require('mysql');
//mysql 配置文件
var config  = require('./mysql_config');


//创建连接池
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    port: config.port
});



//执行SQL语句
exports.excuteSQL = function (sql, callback){
    this.getConnection(function (err, connection){
        connection.query(sql, function (){
            callback.apply(connection, arguments);
            connection.release();
        });
    })
}.bind(pool);