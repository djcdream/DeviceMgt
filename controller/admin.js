/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');


var Admin=mongoose.model('Admin');


//��ȡ���ù�˾����Ա��Ϣ
exports.getCompanys= function(req, res) {
    //��ȡ��ǰҳ
    var curr=req.body.curr;
    //ÿҳ��СΪ10
    var query=Admin.find({});
    query.skip((curr-1)*10);
    query.limit(10);
    //����id��ӵ�˳��������
    query.sort({'_id': -1});
    //�����ҳ����
    query.exec(function(err,rs){
        if(err){
            res.json({status:"error"});
        }else{
            //������������
            Admin.find(function(err,result){
                if(result.length%10>0){
                    pages=result.length/10+1;
                }else{
                    pages=result.length/10;
                }
                jsonArray={status:"success",data:rs,pages:pages};
                res.json(jsonArray);
            });
        }
    });
};

//���һ������
exports.addCompany= function(req, res) {

    var username=req.body.username;
    var phone=req.body.phone;
    var password=req.body.password;
    var realname=req.body.realname;
    var createTime=req.body.createTime;

    var data=new Admin(
        {
            username:username,
            phone:phone,
            password:password,
            realname:realname,
            createTime:createTime
        }
    );

    data.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            res.json({"status":"success"});
        }
    });
};
//ɾ��һ������Ա
exports.delOne= function(req, res) {

    var id=req.body.id;
    Admin.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            Admin.remove({_id:id},function(err,doc){
                    if(err){
                        res.json({"status":"error"});
                    }else{
                        res.json({"status":"success"})
                    }
                });
            }
    });
};

