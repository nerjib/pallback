// Set your app credentials
const credentials = {
    apiKey: '42a2485e1729a3934c05f9139b2bcde92ad51fd32e8a38705e4236ae9d575575', 
    username: 'sandbox'
}
const express = require('express');
const moment = require ('moment')
const router = express.Router();
// Initialize the SDK
const AfricasTalking = require('africastalking')(credentials);

// Get the voice service
const voice = AfricasTalking.VOICE;

function makeCall() {
    const options = {
        // Set your Africa's Talking phone number in international format
        callFrom: '+234800002021',
        // Set the numbers you want to call to in a comma-separated list
        callTo: ['+2348065671336']
    }

    // Make the call
    voice.call(options)
        .then(console.log)
        .catch(console.log);
}

router.get('/', async (req, res) => {
//makeCall();
const options = {
    // Set your Africa's Talking phone number in international format
    callFrom: '+234800002021',
    // Set the numbers you want to call to in a comma-separated list
    callTo: ['+2348065671336']
}

// Make the call
voice.call(options)
    .then(console.log)
    .catch(console.log);
})

module.exports = router;

