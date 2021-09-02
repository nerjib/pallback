const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../../db/index');
const dotenv = require('dotenv');
const upload = require('../multer')
const cloudinary = require('../cloudinary')


  
  
  router.get('/', async (req, res) => {
    const getAllQ = `SELECT * FROM kdpunits  order by lga asc, ward asc, puid asc`;
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
  });  

  router.get('/logdet', async (req, res) => {
    const getAllQ = `SELECT distinct(pword, uname,ward) FROM kdpunits  order by lga asc, ward asc, puid asc`;
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
  });  
  
  router.get('/apc', async (req, res) => {
    const getAllQ = `SELECT sum(apc) FROM punits`;
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
  });  
  router.get('/pdp', async (req, res) => {
    const getAllQ = `SELECT sum(pdp) FROM punits`;
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
  });  
  router.get('/others', async (req, res) => {
    const getAllQ = `SELECT sum(others) FROM punits`;
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
  });  
  router.get('/accredited', async (req, res) => {
    const getAllQ = `SELECT sum(accredited) FROM punits`;
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
  });  


  router.get('/wards/:ward', async (req, res) => {
    const getAllQ = `SELECT sum(apc) as apc, sum(pdp) as pdp, sum(others) as others, sum(accredited) as accredited FROM kdpunits where ward=$1`;
    try {
      // const { rows } = qr.query(getAllQ);
      if(req.params.ward='GURE'){

      const { rows } = await db.query(getAllQ,['GURE/KAHUGU']);
      return res.status(201).send(rows);
      }
      else{
        const { rows } = await db.query(getAllQ,[req.params.ward]);
        return res.status(201).send(rows);
     
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  
  

  router.get('/lga/:lga', async (req, res) => {
    const getAllQ = `SELECT sum(apc) as apc, sum(pdp) as pdp, sum(others) as others, sum(accredited) as accredited FROM kdpunits where lga=$1`;
    try {
      // const { rows } = qr.query(getAllQ);
     
        const { rows } = await db.query(getAllQ,[req.params.ward]);
        return res.status(201).send(rows);
     
      
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  
  

  router.post('/send', async (req, res) => {
    /*   const {
           to,
           message
       } = req.body;
   */try{
    console.log(JSON.stringify(req.body)+ 'fjjjjjjjjjj')

   return res.status(201).send(req.body.message)
   console.log(req.body.to)
   /*let to =req.body.to
   let message = req.body.message
       sms.send({ to, message, enque: true })
           .then(response => {
               console.log(response);
               res.json(response);
           })
           .catch(error => {
               console.log(error);
               res.json(error.toString());
           });*/}catch(e){
             console.log(e)
           }
   });


  module.exports = router;
