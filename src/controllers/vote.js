const express = require('express');
const moment = require ('moment')
const router = express.Router();
const db = require('../db/index');
const dotenv = require('dotenv');
const upload = require('./multer')
const cloudinary = require('./cloudinary')




router.post('/', upload.single('file'),  async(req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, req.body.ward+req.body.puid+'_'+(new Date()).getTime());

/*
    cloudinary.uploader.upload(req.file.path,  function (result) {
          console.log(result.secure_url)
          res.send({imgurl:result.secure_url})
         Activity.UpdateBeneficiary(req, res, result.secure_url);
        });

*/

    if (req.method === 'POST') {
        const urls = []
        const file = req.file.path;
    //    for (const file of files) {
       //   const { path } = file;
          const newPath = await uploader(file)
          urls.push(newPath.url)
         // fs.unlinkSync(path)
      //  }
    
   // cloudinary.uploader.upload(req.file.path, async (result)=> {
    
    const createUser = `INSERT INTO
      results(puid, puname, ward,remark, apc, pdp, others, time, imgurl, sender)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    console.log(req.body)
    const values = [
    req.body.puid,
    req.body.puname,
    req.body.ward,
    req.body.remark,
    req.body.apc,
    req.body.pdp,
    req.body.others,
    moment(new Date()),
    urls[0],
    req.body.sender
      ];
    try {
    const { rows } = await db.query(createUser, values);
    // console.log(rows);
    
    return res.status(201).send(rows);
    } catch (error) {
    return res.status(400).send(error);
    }
  
  //  },{ resource_type: "auto", public_id: `ridafycovers/${req.body.title}` })

} else {
    res.status(405).json({
      err: `${req.method} method not allowed`
    })
  }

  });
 

/*
    router.post('/', async (req, res) => {
      const createUser = `INSERT INTO
      results(puid, puname, ward,remark, apc, pdp, others, time, imgurl)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
    console.log(req.body)
    const values = [
    req.body.puid,
    req.body.puname,
    req.body.ward,
    req.body.remark,
    req.body.apc,
    req.body.pdp,
    req.body.others,
    moment(new Date()),
    req.body.imgurl
      ];
    try {
    const { rows } = await db.query(createUser, values);
    // console.log(rows);
    
    return res.status(201).send(rows);
    } catch (error) {
    return res.status(400).send(error);
    }
    
    });
  */
  
  
  router.get('/', async (req, res) => {
    const getAllQ = `SELECT * FROM results order by ward`;
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

  router.get('/byward/:ward', async (req, res) => {
    const getAllQ = `SELECT * FROM results where ward= $1`;
    try {
      // const { rows } = qr.query(getAllQ);
      const { rows } = await db.query(getAllQ, [req.params.ward]);
      return res.status(201).send(rows);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send(`${error} jsh`);
    }
  });  

  module.exports = router;
