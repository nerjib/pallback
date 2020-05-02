const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const moment = require ('moment')
const Request = require('../middleware/requestlog')
//const db = require('../db/index');


//const responseTime = require('response-time');
 //const xml = require('xml')
const  Estimator = require('./estimatorCal')

const xml = require ('xml2js')

router.get('/',Request.logRequest, async (req, res) => {
  res.send({
    h:'hell',
    y:'yello'
  })
})

module.exports =  router;
