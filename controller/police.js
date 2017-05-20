/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');


var Police=mongoose.model('Police');

//������������Ż�ȡ���н�����Ϣ
exports.getPoliceByAddressCode= function(req, res) {
    Police.find({}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"���ҹ���Աʧ��"});
        }
        res.json({"status":"success","data":docs});
    })
};

//��ҳ������������Ż�ȡ���н�����Ϣ
exports.getPolicesByAddressCode= function(req, res) {
    //��ȡ��ǰҳ
    var curr=req.body.curr;
    var addressCode=req.body.addressCode;

    console.log(curr);
    console.log(addressCode);

    //ÿҳ��СΪ10
    var query=Police.find({});
    //���ݹؼ��ֲ�ѯ
    query.where('addressCode', addressCode);
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
            Police.find({ 'addressCode': addressCode },function(err,result){
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
exports.addPolice= function(req, res) {

    var username=req.body.username;
    var phone=req.body.phone;
    var password=req.body.password;
    var realname=req.body.realname;
    var addressCode=req.body.addressCode;
    var createTime=req.body.createTime;

    var data=new Police(
        {
            username:username,
            phone:phone,
            password:password,
            realname:realname,
            addressCode:addressCode,
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
    Police.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
                admin.remove({_id:id},function(err,doc){
                    if(err){
                        res.json({"status":"error"});
                    }else{
                        res.json({"status":"success"})
                    }
                });
            }
    });

};

