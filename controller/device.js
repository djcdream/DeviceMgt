/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');

var Device=mongoose.model('Device');


//���������ȡ�豸��Ϣ
exports.getDevicesByAddressCode= function(req, res) {
    //��ȡ��ǰҳ
    var addressCode=req.body.addressCode;
    Device.find({addressCode:addressCode}, function (err, docs) {
        if(err){
            res.json({"status":"error","msg":"�����豸ʧ��"});
        }
        res.json({"status":"success","data":docs});
    })
};

//ͨ���豸id��ȡĳһ���豸��������Ϣ;
exports.getdeviceByDeviceId= function(req, res) {
    var deviceId=req.body.deviceId;
    Device.findOne({_id:deviceId},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc.deviceInfo});
        }
    });
};

//��ȡĳһ���û�
exports.getDevice= function(req, res) {
    var id=req.params.id;
    Device.findOne({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success","data":doc})
        }
    });
};

//ɾ��ĳһ���û�
exports.delOne= function(req, res) {
    var id=req.body.id;
    Device.remove({_id:id},function(err,doc){
        if(err){
            res.json({"status":"error"});
        }else{
            res.json({"status":"success"})
        }
    });
};

//���һ���豸
exports.addOne= function(req, res) {

    var deviceName=req.body.deviceName;
    var workStatus=req.body.workStatus;
    var constructDep=req.body.constructDep;
    var constructTime=req.body.constructTime;
    var maintenanceMan=req.body.maintenanceMan;
    var deviceCode=req.body.deviceCode;
    var maintenancePhone=req.body.maintenancePhone;
    var addressCode=req.body.addressCode;
    var jingdu=req.body.jingdu;
    var weidu=req.body.weidu;

    var newDevice=new Device(
        {
            //�豸����
            deviceName:deviceName,
            //����״̬
            workStatus:workStatus,
            //ʩ����λ
            constructDep:constructDep,
            //ʩ��ʱ��
            constructTime:constructTime,
            //ά����Ա
            maintenanceMan:maintenanceMan,
            //�豸���
            deviceCode:deviceCode,
            //ά���绰
            maintenancePhone:maintenancePhone,
            //�������
            addressCode:addressCode,
            //����
            jingdu:jingdu,
            //γ��
            weidu:weidu,
            //����״̬
            workStatus:workStatus
        }
    );
    newDevice.save(function(err){
        if(err){
            res.json({"status":"error"})
        }else{
            console.log("success add device");
            res.json({"status":"success",device_id:newDevice._id});
        }
    });
};

exports.adddeviceByDeviceId= function(req, res) {

    var device_id=req.body.device_id;
    var deviceNumber=req.body.deviceNumber;
    var deviceOne=req.body.deviceOne;
    var deviceOneIp=req.body.deviceOneIp;
    var deviceTwo=req.body.deviceTwo;
    var deviceTwoIp=req.body.deviceTwoIp;

    // �����ĵ����������
    var conditions ={_id : device_id};
    var update     ={$push : {deviceInfo:{deviceNumber:deviceNumber,
                                         deviceOne:deviceOne,
                                         deviceOneIp:deviceOneIp,
                                         deviceTwo:deviceTwo,
                                         deviceTwoIp:deviceTwoIp}
                                        }};
    Device.update(conditions, update, function(error){
        if(error) {
            res.json({"status":"error"});
        } else {
            //��������������Ϣ
            Device.findOne({_id:device_id},function(err,doc){
                if(err){
                    res.json({"status":"error"});
                }else{
                    res.json({"status":"success","data":doc.deviceInfo})
                }
            });
        }
    });
};

//����ĳ���û�
exports.updateUser= function(req, res) {
        var id=req.params.id;
        var username=req.body.username;
        console.log(username);
        var password=req.body.password;
        console.log(password);
        // �޸ļ�¼
        var conditions ={_id : id};
        var update     ={$set : {username:username, password : password}};
        var options    = {upsert : true};
        Device.update(conditions, update, options, function(error){
            if(error) {
                res.json({"status":"error"});
            } else {
                res.json({"status":"success"});
            }
        });
};












