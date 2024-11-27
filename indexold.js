const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');
const QRCode = require('qrcode-terminal');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const CHARACTERISTICS_FILE = path.join(__dirname, 'characteristics.json');
// Cached characteristics
let cachedCharacteristics = [];


function loadCharacteristics() {
    if (fs.existsSync(CHARACTERISTICS_FILE)) {
        return JSON.parse(fs.readFileSync(CHARACTERISTICS_FILE, 'utf-8'));
    }
    console.error('Characteristics file not found.');
    return [];
}

// Register user in memory (no database)
const users = {}; // In-memory storage for simplicity

function registerUser(phoneNumber) {
    if (!users[phoneNumber]) {
        users[phoneNumber] = { phoneNumber, lastLoggedIn: new Date().toISOString() };
        console.log(`New user registered: ${phoneNumber}`);
    } else {
        users[phoneNumber].lastLoggedIn = new Date().toISOString();
        console.log(`User ${phoneNumber} last logged in updated.`);
    }
}

// Fetch characteristics from Directus
// const fetchCharacteristics = async () => {
//     try {
//         console.log('Fetching characteristics from Directus...');
//         const response = await axios.get(
//             'http://18.192.215.55:8055/items/Characteristics',
//             {
//                 headers: {
//                     Authorization: 'Bearer ba_8XbqhhZAqd7SAIqSjl-tDwf-OGBTq'
//                 }
//             }
//         );
//         cachedCharacteristics = response.data.data.map((item) => ({
//             id: item.id,
//             chracteristic_name: item.chracteristic_name,
//             choices: item.choices
//         }));
//         console.log('Characteristics fetched and cached:', cachedCharacteristics);
//     } catch (error) {
//         console.error('Error fetching characteristics:', error.message);
//     }
// };

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Event: QR Code
client.on('qr', (qr) => {
    console.log('QR Code received, generating...');
    QRCode.generate(qr, { small: true });
    console.log('QR Code is ready. Scan it to log in.');
});

// Event: Ready
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Event: Auth Failure
client.on('auth_failure', (message) => {
    console.error('Authentication failure:', message);
});

// Event: Disconnected
client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
});

// Log client events
client.on('loading_screen', (percent, message) => {
    console.log(`LOADING SCREEN ${percent}% - ${message}`);
});

// WhatsApp Message Flow
client.on('message', async (msg) => {
    if (msg.body === '!start') {
        const userNumber = msg.from.replace('@c.us', ''); // Extract phone number
        registerUser(userNumber); // Register user in memory

        const characteristics = loadCharacteristics();

        // Send list of characteristics
        const buttons = characteristics.map((item) => ({
            buttonId: item.id,
            buttonText: { displayText: item.characteristic_name },
            type: 1,
        }));

        const buttonMessage = {
            text: 'Please choose a characteristic:',
            buttons: buttons,
            headerType: 1,
        };

        await client.sendMessage(msg.from, buttonMessage);
    } else if (msg.type === 'buttons_response') {
        // Handle characteristic selection
        const characteristics = loadCharacteristics();
        const selectedCharacteristic = characteristics.find(
            (item) => item.id === msg.selectedButtonId
        );

        if (selectedCharacteristic) {
            const choices = selectedCharacteristic.choices.map((choice, index) => ({
                buttonId: `${msg.selectedButtonId}-${index}`,
                buttonText: { displayText: choice },
                type: 1,
            }));

            const choiceMessage = {
                text: `You selected "${selectedCharacteristic.characteristic_name}". Please choose an option:`,
                buttons: choices,
                headerType: 1,
            };

            await client.sendMessage(msg.from, choiceMessage);
        }
    } else if (msg.body.startsWith('!send')) {
        // Parse the phone number and results
        const userMessage = msg.body.replace('!send ', '').split('|');
        const targetNumber = userMessage[0].trim();
        const assessment = userMessage[1].trim();

        const messageToSend = `We received the following assessment from an anonymous user:\n${assessment}`;

        await client.sendMessage(`${targetNumber}@c.us`, messageToSend);
        await client.sendMessage(msg.from, 'Your assessment has been sent. Thank you!');
    }
});


// Fetch characteristics and start client
// (async () => {
//     // await fetchCharacteristics();
//     console.log('Initializing WhatsApp client...');
// })();

client.initialize();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});