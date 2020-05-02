const express = require('express')
const http = require('http')
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require('path')
const responseTime = require('response-time');
const fs = require('fs')
const app = express();
const Estimator = require('./src/controllers/estimator')

const Request = require('./src/middleware/requestlog')

app.use(cors())

http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


dotenv.config();


app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
      return res.status(200).json({});
    }
    next();
  });
  
  /*
  app.use(responseTime({
      digits: 1
  }))
  
app.use(responseTime((req,res,time)=>{
//    console.log(`${req.method}  ${req.url}  ${req.statusCode}  ${time}`);
  
  
if(`${req.method}`=='POST'){
    fs.readFile('./src/db/logs.json','utf8',(err, jsonString)=>{
        if (err){
            console.log('read failed', err)
            return
        }
        //jsonString.pu
        //const kk={ ...jsonString, "log":"hhh"};
       // console.log(JSON.parse(kk.log))

        const logs = JSON.parse(jsonString)
      //  console.log(Object.keys(logs).length)
        // count = Object.keys(logs).length + 1;
        const k= { log:`${logs.log}`+','+`${req.method}  /api/v1/${req.url}  ${req.statusCode}  ${time}`}
     //   const kk={...logs, h:k, log: `${req.method}  ${req.url}  ${req.statusCode}  ${time}`} ;
   //     const k2=kk.push({k:'k',l:0})
  // console.log(kk)
            const kk2j = JSON.stringify(k);
            fs.writeFile('./src/db//logs.json',kk2j,err=>{
            if (err){
                console.log(err)
            }console.log('success')

            })
        
     // console.log(Object.keys(k).map(e=>k[e]))
            //console.log(kk.log)
       // console.log((logs.log))
    })
  
  
  
}
  
  /*  const address = {
        log: `${req.method}  ${req.url}  ${req.statusCode}  ${time}`
    }
    const addressString = JSON.stringify(address)
  //  console.log(addressString)
   fs.writeFile('./src/db/logs.json', addressString, err=>{
        if (err) {
            console.log('error write', err)
        }else{
            console.log('success')
        }
    })
 /* fs.readFile('./src/db/logs.json','utf8',(err, jsonString)=>{
        if (err){
            console.log('read failed', err)
            return
        }
        const logs = JSON.parse(jsonString)
        console.log((logs.log))
    })
    
}))  
*/
app.get('/', function(req,res){
res.json({
    m:'sdg'
})
})

app.use('/api/v1/', Estimator);
  


module.exports = app;