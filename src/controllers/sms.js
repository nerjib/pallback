const express = require('express');
const router = express.Router();

// Get authentication secrets from a file
//const credentials = require('../../test/fixtures');

const AfricasTalking = require('africastalking')({
    apiKey: '42a2485e1729a3934c05f9139b2bcde92ad51fd32e8a38705e4236ae9d575575', 
    username: 'sandbox'
  });//(credentials.TEST_ACCOUNT);
/*const africastalking = AfricasTalking({
    apiKey: '42a2485e1729a3934c05f9139b2bcde92ad51fd32e8a38705e4236ae9d575575', 
    username: 'sandbox'
  });*/
const sms = AfricasTalking.SMS;

// Send SMS route
router.post('/send', async (req, res) => {
  const {
        to,
        message
    } = req.body;

//return res.send(req.body.message)
console.log(req.body.to)
//let to =req.body.to
//let message = req.body.message
    sms.send({ to, message, from:'8006', enque: true })
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error.toString());
        });
});

router.post('/inmsg', (req, res) => {
    const data = req.body;
    console.log(`Received message: \n ${data}`);
    res.sendStatus(200);
  });

module.exports = router;
