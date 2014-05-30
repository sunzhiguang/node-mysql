
/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
//引用mysql
var mysql   = require('./config/mysql_pool');
//创建连接

//执行SQL语句。进行数据库操作
mysql.excuteSQL('select * from USER',function(err, rows, fields){
        if (err) throw err;
    console.log('select success The result is: ', rows);
    console.log('The result length is',rows.length);
});
//-----select sql
//conn.query('SELECT * from USER', function(err, rows, fields) {
//    if (err) throw err;
//    console.log('select success The result is: ', rows);
//    console.log('The result length is',rows.length);
//});
//-----insert sql
//conn.query('insert into USER(name,password) values (?,?)',['lishimeng',123456],
//    function(err, rows, fields) {
//    if (err) throw err;
//    console.log('insert success The result is: ', rows);
//    console.log('The result length is',rows.length);
//});
//-----delete sql
//conn.query('delete from USER where name = ?',['lishimeng'],
//    function(err, rows, fields) {
//    if (err) throw err;
//    console.log('delete success The result is: ', rows);
//    console.log('The result length is',rows.length);
//});
//-----update sql
//conn.query('update  USER set name = ? where name = ?',['sunzhongsan','lishimeng'],
//    function(err, rows, fields) {
//    if (err) throw err;
//    console.log('delete success The result is: ', rows);
//    console.log('The result length is',rows.length);
//});



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
