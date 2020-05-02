const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const moment = require ('moment')
const Request = require('../middleware/requestlog')
const db = require('../db/index');


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

router.post('/beneficiaries',Request.logRequest, async (req, res) => {
    
  const inputData = `INSERT INTO
  beneficiaries(first_name,last_name,family_name,occupation,phone_no,address)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
//console.log(req.body)
const values = [
req.body.fname,
req.body.lname,
req.body.familyname,
req.body.occupation,
req.body.phone,
req.body.address
];
try {
const { rows } = await db.query(inputData, values);
// console.log(rows);
return res.status(201).send(rows);
} catch (error) {
return res.status(400).send(error);
}
});

router.get('/beneficiaries',Request.logRequest, async (req, res) => {

  const getAllQ = 'SELECT * FROM beneficiaries order by id asc';
  try {
    // const { rows } = qr.query(getAllQ);
    const { rows } = await db.query(getAllQ);
    return res.status(201).send(rows);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return res.status(400).send({ message: 'User with that EMAIL already exist' });
    }
    return res.status(400).send(`${error} jsh`);
  }
  //  const output1 = (Estimator.covid19ImpactEstimator(req.body))

});


module.exports =  router;
