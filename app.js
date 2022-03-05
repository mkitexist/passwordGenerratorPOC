const express=require("express");
const CryptoJS=require("crypto-js")
const app=express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get(`/passwordgenrator`,(req,res,next)=>{
  // public passwordGenerater(): any {
    let password = '';
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    for (let i = 1; i < 16; i++) {
        var c = Math.floor(Math.random() * chars.length + 1);
        password += chars.charAt(c)
    }
    console.log("password",password);
    // password = AuthenticationMiddleware.passwordEncrypt(
      // AuthenticationMiddleware.passwordGenerater()).toString();
      // public passwordEncrypt(password, secret = ''): any {
        // secret = (secret !== '' ? 'dinga' : config.encryptionSecretKey);
       let secret = 'dinga';
        const key = CryptoJS.enc.Utf8.parse(secret);
        const iv = CryptoJS.enc.Utf8.parse('encryptionIntVec');
        const encrypted_password = CryptoJS.AES.encrypt(password, key, {
            keySize: secret.length,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return res.send(encrypted_password.toString());
    // }
    // return password;

//     }
     }
   )
app.post('/get',(req,res)=>{
       const key = CryptoJS.enc.Utf8.parse(req.body.token);
       const civ = CryptoJS.enc.Utf8.parse('encryptionIntVec');
       const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, key, {
         iv: civ,
         keySize: key,
         mode: CryptoJS.mode.CBC,
         padding: CryptoJS.pad.Pkcs7
       });
      return res.send(`<div style="text-align:center;background-color:white; border:1px solid #d90d52;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;-webkit-transform: scale(0.8);
      -ms-transform: scale(0.8);
      transform: scale(0.8); "><h3>${encryptedPassword.toString()}</h3></div>`);
})
app.use('/', router);
app.listen(5001,()=>{
    console.log("app listening on port 5001")
})

 
