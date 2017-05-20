/**
 * Created by 1 on 2016/5/16.
 */
// index page
var mongoose=require('mongoose');
var Police=mongoose.model('Police');
var Admin=mongoose.model('Admin');

//��ҳ��
exports.index= function(req, res) {
    res.render('index');
};

//��¼����
exports.login= function(req, res) {
    res.render('login');
};

//���е�¼��Ӧ
exports.toLogin= function(req, res) {
    var username=req.body.username;
    var password=req.body.password;
    var captcha=req.body.captcha;

    if(captcha!=req.session.captcha){
        console.log('captcha error');
        res.json({'status':'captcha error'});
    }else{ //��֤����ȷ
           //����ǽ����û�������н����û���ѯ
            Police.findOne({username:username},function(err,doc){
                if(err){
                    console.log('error');
                    res.json({'status':'error'});
                }
                else if(doc==null){
                    //police��û�о�ȥadmin�в����û�
                    Admin.findOne({username:username},function(err,doc){
                        if(err){
                            console.log('error');
                            res.json({'status':'error'});
                        }
                        else if(doc==null){
                            console.log('not exist');
                            res.json({'status':'not exist'})
                        }
                        else if(doc.password===password){
                            console.log('success');
                            //��¼�ɹ�����user���浽session��
                            req.session.user = doc;
                            res.json({'status':'admin','username':doc.username});
                        }else{
                            console.log('password error');
                            res.json({'status':'password error'});
                        }
                    }
                    );
                }else if(doc.password===password){
                    console.log('success');
                    //��¼�ɹ�����user���浽session��
                    req.session.user = doc;
                    res.json({'status':'police','username':doc.username});
                }else{
                    console.log('password error');
                    res.json({'status':'password error'});
                }
            });
        }
};

//�û��ǳ�����
exports.logout = function(req, res) {
    req.session.user = null;
    res.redirect('/login');
};

//�����û���ҳ��
exports.index_police= function(req, res) {
    res.render('index_police');
};













