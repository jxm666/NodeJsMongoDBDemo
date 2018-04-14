var MongoClient = require('mongodb').MongoClient;
//没有 parimy 主服务器
var url = "mongodb://192.168.137.60:27017,192.168.137.62:27017/?replicaSet=rs0&slaveOk=true";
// var url = "mongodb://192.168.137.60:27017,192.168.137.61:27017,192.168.137.62:27017/test?replicaSet=rs0&slaveOk=true";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    var dbo = db.db("test");

    //写入数据
    var myobj = { name: "非MasterIp数据插入", url: "www.edaibu.com" };
    dbo.collection("test").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
    });

    //读取数据
    dbo.collection("test"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        //输出查询结果
        console.log(result);
    });

    setTimeout(function B() {
        db.close();
    }, 2000);

    //db.close();
});