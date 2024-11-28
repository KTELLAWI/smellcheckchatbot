const express = require('express');
const fs = require('fs');
const { Client, LocalAuth, List } = require('whatsapp-web.js');
const path = require('path');
const { Buttons } = require('whatsapp-web.js');
const qr2 = require("qrcode");
const pkg = require("qrcode-terminal");
const axios = require("axios");
const { exec } = require('child_process');
const puppeteer = require('puppeteer-core');

const app = express();
const PORT = 3000;
const ARCHARACTERISTICS_FILE = path.join(__dirname, 'characteristics_ar.json');
const ENCHARACTERISTICS_FILE = path.join(__dirname, 'characteristics_en.json');
// const whatsappisready= false;
app.use(express.urlencoded({ extended: true }));
let qrcoding = "";
// let qrauth= false;
let authenticated = false;
let response = null;
// Initialize WhatsApp Client

let arCharacteristics = {};
let enCharacteristics = {};


function loadEnCharacteristics() {
    if (fs.existsSync(ENCHARACTERISTICS_FILE)) {
        return JSON.parse(fs.readFileSync(ENCHARACTERISTICS_FILE, 'utf-8'));
    }
    console.error('Characteristics file not found.');
    return [];
}
function loadArCharacteristics() {
    if (fs.existsSync(ARCHARACTERISTICS_FILE)) {
        return JSON.parse(fs.readFileSync(ARCHARACTERISTICS_FILE, 'utf-8'));
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



/// utility function to 



function normalizeNumber(input) {
    const arabicToEnglishMap = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
        '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
    };

    return input
        .split('')
        .map(char => arabicToEnglishMap[char] || char) // Convert Arabic numerals, keep others unchanged
        .join('');
}


app.get("/authenticate/:phoneNumber", (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    // const promt = req.params.promt;

    const sessionName = `session-${phoneNumber}`;

    const client = new Client({
        authStrategy: new LocalAuth({ clientId: sessionName }),
        // authStrategy: new LocalAuth(),
        puppeteer: {
            executablePath: '/usr/bin/chromium-browser', // Path to your Chromium executable
            headless: true, // Run in headless mode
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-gpu',
                '--disable-dev-shm-usage',
            ],

        },
    });
    console.log("Client is not ready to use!");
    console.log(client);
    client.on("qr", (qrCode) => {

        pkg.generate(qrCode, { small: true });
        qr2.toDataURL(qrCode, (err, src) => {
            console.log(src);
            if (err) res.send("Error occured");
            res.send(`
                <!DOCTYPE html>
 
 <html>
 
 <head>
     <title>SmellCheckMate ChatBot</title>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
     <style>
         body,
         h1 {
             font - family: "Raleway", sans-serif
         }
 
         body,
         html {
             height: 100%
         }
 
         .bgimg {
             background: url('https://i.imgur.com/oee9rXL.png');
             min-height: 100%;
 
             background-repeat: repeat;
             object-fit: contain;
         }
 
         .lbl {
             font - family: 'Cairo', sans-serif;
             font-weight: 500;
             /* High weight for bold text */
             font-size: 2.0em;
             color: white;
             background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
             /* Dark blue gradient with 50% transparency */
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
             border-radius: 10px;
             padding: 10px;
 
         }
 
         .lbl1 {
             font - family: 'Cairo', sans-serif;
             font-weight: 400;
             /* High weight for bold text */
             font-size: 1.5em;
             color: white;
             background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
             /* Dark blue gradient with 50% transparency */
             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
             border-radius: 10px;
             padding: 10px;
 
         }
     </style>
 </head>
 
 <body>
 
     <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
         <div class="w3-display-topleft w3-padding-large w3-xlarge">
             SmellCheckMate ChatBot
         </div>
         <div id='content' class="w3-display-middle">
             <center>
                 <h2 class=" lbl w3-jumbo w3-animate-top">QRCode Generated</h2>
 
                 <hr class="w3-border-grey" style="margin:auto;width:40%">
                 <p class="w3-center">
                 <div><img src=${src} /></div>
                 </p>
             </center>
         </div>
         <div class="w3-display-bottomleft w3-padding-large">
             Powered by <a class="lbl1" href="" target="_blank">DigistacksAI</a>
         </div>
     </div>
   <script>
        const eventSource = new EventSource('/updates');
        eventSource.onmessage = (event) => {
            if (event.data === "authenticated") {
                const bb = document.getElementById('content');
                //document.body.innerHTML = ''; // Clear current content
                bb.innerHTML = 'You are already authenticated with the Bot. Please continue using the same device or log out and reauthenticate'; // Clear current content
                bb.classList.add('lbl');


                eventSource.close();
            }
            if (event.data === "firstauthenticated") {
                const bb = document.getElementById('content');
                //document.body.innerHTML = ''; // Clear current content
                bb.innerHTML = 'Authentication has done, you can close this window'; // Clear current content
                bb.classList.add('lbl');


                eventSource.close();
            }
        };
    </script>
 </body>
 
 </html>   
                             `

            );

            //             res.send(`
            //       <!DOCTYPE html>
            // <html>
            // <head>
            // <title>SearchAgentGPT</title>
            // <meta charset="UTF-8">
            // <meta name="viewport" content="width=device-width, initial-scale=1">
            // <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            // <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
            // <style>
            // body,h1 {font-family: "Raleway", sans-serif}
            // body, html {height: 100%}
            // .bgimg {
            //   background-image: url('https://th.bing.com/th/id/OIG.9OaOz..GySPJde.ZPNZ8?pid=ImgGn');
            //   min-height: 100%;
            //   background-position: center;
            //   background-size: cover;
            // }
            // </style>
            // </head>
            // <body>

            // <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
            //   <div class="w3-display-topleft w3-padding-large w3-xlarge">
            //   SearchAgentGPT
            //   </div>
            //   <div class="w3-display-middle">
            //  <center>
            //     <h2  class="w3-jumbo w3-animate-top">QRCode Generated</h2>

            //     <hr class="w3-border-grey" style="margin:auto;width:40%">
            //     <p class="w3-center"><div><img src='${src}'/></div></p>
            //     </center>
            //   </div>
            //   <div class="w3-display-bottomleft w3-padding-large">
            //     Powered by <a href="/" target="_blank">DigistacksAI</a>
            //   </div>
            // </div>

            // </body>
            // </html>

            //     `);
        });
    });

    client.on("ready", () => {
        console.log("Client is ready!");
        exec("  pkill -f chromium-browser ", (error, stdout, stderr) => {
            console.log('Executing command...');
    
            if (error) {
                console.error(`Error executing command: ${error.message}`);
            }
            if (stderr) {
                console.warn(`Command stderr: ${stderr}`);
            }
            console.log(`stdout: ${stdout}`);
        });
//         res.send(`
//             <!DOCTYPE html>

// <html>

// <head>
//  <title>SmellCheckMate ChatBot</title>
//  <meta charset="UTF-8">
//  <meta name="viewport" content="width=device-width, initial-scale=1">
//  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
//  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
//  <style>
//      body,
//      h1 {
//          font - family: "Raleway", sans-serif
//      }

//      body,
//      html {
//          height: 100%
//      }

//      .bgimg {
//          background: url('https://i.imgur.com/oee9rXL.png');
//          min-height: 100%;

//          background-repeat: repeat;
//          object-fit: contain;
//      }

//      .lbl {
//          font - family: 'Cairo', sans-serif;
//          font-weight: 500;
//          /* High weight for bold text */
//          font-size: 2.0em;
//          color: white;
//          background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
//          /* Dark blue gradient with 50% transparency */
//          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
//          border-radius: 10px;
//          padding: 10px;

//      }

//      .lbl1 {
//          font - family: 'Cairo', sans-serif;
//          font-weight: 400;
//          /* High weight for bold text */
//          font-size: 1.5em;
//          color: white;
//          background: linear-gradient(to right, rgba(0, 4, 40, 1), rgba(0, 78, 146, 1));
//          /* Dark blue gradient with 50% transparency */
//          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
//          border-radius: 10px;
//          padding: 10px;

//      }
//  </style>
// </head>

// <body>

//  <div class="bgimg w3-display-container w3-animate-opacity w3-text-white">
//      <div class="w3-display-topleft w3-padding-large w3-xlarge">
//          SmellCheckMate ChatBot
//      </div>
//      <div id='content' class="w3-display-middle">
//          <center>
//              <h2 class=" lbl w3-jumbo w3-animate-top">QRCode Generated</h2>

//              <hr class="w3-border-grey" style="margin:auto;width:40%">
//              <p class="w3-center">
//              <div><You can close this window now</div>
//              </p>
//          </center>
//      </div>
//      <div class="w3-display-bottomleft w3-padding-large">
//          Powered by <a class="lbl1" href="" target="_blank">DigistacksAI</a>
//      </div>
//  </div>

// </body>

// </html>   
//                          `

//         );


    });

    client.initialize();

    const userSelections = {};
    client.on('message', async (msg) => {
        const userNumber = msg.from.replace('@c.us', ''); // Extract phone number

        if (msg.body === '####') {

            try {
                // Make POST request to the endpoint
                await axios.post('http://62.72.57.75:4000/execute', {}, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                // console.log("Log added successfully:", response.data);
            } catch (error) {
                //console.error("Error adding log:", error.message);

            }
            await client.sendMessage(
                msg.from,
                "Server has restarted, wait one minute and reuse the bot"
            );
            return;
        }
        // Initialize user session userNumberif not present
        if (!userSelections[userNumber]) {
            userSelections[userNumber] = {
                stage: 'selecting_language',
                language: null,
                characteristics: [],
                selectedCharacteristics: [],
                currentCharacteristicIndex: 0,
            };

            const response = `

Hi there! Welcome to Smell Checkmate 👋  

We're here to help you share “private, constructive feedback” that promotes self-improvement and awareness in a respectful way. 🌟

Let’s get started!  
Please choose your language:  
1️⃣ English  
2️⃣ Arabic  

(Type the number for your preferred language. You can type # anytime to reset.)

مرحبًا! مرحبًا بك في Smell Checkmate 👋           

نحن هنا لمساعدتك في مشاركة ملاحظات خاصة وبناءة تعزز التحسين الذاتي والوعي بطريقة محترمة 🌟 .
لنبدأ!
يرجى اختيار لغتك:
1️⃣ الإنجليزية
2️⃣ العربية
اكتب الرقم لاختيار لغتك المفضلة. يمكنك كتابة # في أي وقت لإعادة تعيين.



        `;
            await client.sendMessage(msg.from, response);
            return;
        }

        const userSession = userSelections[userNumber];

        // Handle the reset command
        if (msg.body === '#') {
            delete userSelections[userNumber];
            await client.sendMessage(
                msg.from,
                "Session reset. Please type anything to start again by selecting a language."
            );
            return;
        }



        // Language selection stage
        if (userSession.stage === 'selecting_language') {
            const userPayload = {
                phone_number: userNumber, // Phone numbser of the user
                last_logged_in: new Date().toISOString(), // Current datetime in ISO format

            };

            try {
                // Make POST request to the endpoint
                const response = await axios.post('http://62.72.57.75:4000/add-user', userPayload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log("Log added successfully:", response.data);
            } catch (error) {
                console.error("Error adding log:", error.message);

            }
            const normalizedInput = normalizeNumber(msg.body);

            if (normalizedInput === '1') {
                userSession.language = 'en';
                userSession.stage = 'awaiting_start';
                await client.sendMessage(
                    msg.from,
                    "Great! You’ve selected English.\n\nType 'start' to begin the assessment."
                );
            } else if (normalizedInput === '2') {
                userSession.language = 'ar';
                userSession.stage = 'awaiting_start';
                await client.sendMessage(
                    msg.from,
                    "رائع! لقد اخترت اللغة العربية.\n\nاكتب 'ابدأ' لبدء التقييم."
                );
            } else {
                const response = `
Invalid choice. Please select 1 for English or 2 for Arabic.
            `;
                await client.sendMessage(msg.from, response);
            }
            return;
        }

        // Awaiting 'start' or 'ابدأ' stage
        if (userSession.stage === 'awaiting_start') {
            const isEnglish = userSession.language === 'en';
            const startCommand = isEnglish ? 'start' : 'ابدأ' || "ابدا";

            if (msg.body.toLowerCase() === startCommand) {
                userSession.stage = 'selecting_characteristic';
                userSession.characteristics = isEnglish ? enCharacteristics : arCharacteristics;

                const characteristics = userSession.characteristics;
                const response = isEnglish
                    ? "Welcome to Smell Checkmate!\n\nPlease select one or more characteristics for assessment. Type the number(s) or 'all':\n" +
                    characteristics.map((item, index) => `${index + 1}️⃣ ${item.characteristic_name}`).join('\n')
                    : "مرحباً بك في Smell Checkmate!\n\nيرجى اختيار مجال واحد أو أكثر للتقييم. اكتب الرقم أو الأرقام أو 'الكل':\n" +
                    characteristics.map((item, index) => `${index + 1}️⃣ ${item.characteristic_name}`).join('\n');

                await client.sendMessage(msg.from, response);
            } else {
                const response = isEnglish
                    ? "Please type 'start' to begin the assessment."
                    : "يرجى كتابة 'ابدأ' لبدء التقييم.";
                await client.sendMessage(msg.from, response);
            }
            return;
        }

        // Selecting characteristics stage
        if (userSession.stage === 'selecting_characteristic') {
            const normalizedInput = normalizeNumber(msg.body);

            const isEnglish = userSession.language === 'en';
            const characteristics = userSession.characteristics;

            let selectedIndexes = [];
            if (normalizedInput.toLowerCase() === (isEnglish ? 'all' : 'الكل')) {
                selectedIndexes = [...Array(characteristics.length).keys()];
            } else {
                selectedIndexes = normalizedInput
                    .split(',')
                    .map((num) => parseInt(num.trim()) - 1)
                    .filter((index) => index >= 0 && index < characteristics.length);
            }

            if (selectedIndexes.length > 0) {
                userSession.selectedCharacteristics = selectedIndexes.map((index) => characteristics[index]);
                userSession.stage = 'selecting_choices';
                userSession.currentCharacteristicIndex = 0;

                const firstCharacteristic = userSession.selectedCharacteristics[0];
                const response = isEnglish
                    ? `You selected "${firstCharacteristic.characteristic_name}". Please choose an option:\n` +
                    firstCharacteristic.choices.map((choice, index) => `${index + 1}️⃣ ${choice}`).join('\n')
                    : `لقد اخترت "${firstCharacteristic.characteristic_name}". كيف تقيم هذا المجال؟ اختر خياراً:\n` +
                    firstCharacteristic.choices.map((choice, index) => `${index + 1}️⃣ ${choice}`).join('\n');

                await client.sendMessage(msg.from, response);
            } else {
                const response = isEnglish
                    ? "Invalid selection. Please select valid numbers or type 'all'."
                    : "اختيار غير صالح. يرجى اختيار أرقام صالحة أو كتابة 'الكل'.";
                await client.sendMessage(msg.from, response);
            }
            return;
        }

        // Selecting choices for each characteristic
        if (userSession.stage === 'selecting_choices') {
            const normalizedInput = normalizeNumber(msg.body);

            const isEnglish = userSession.language === 'en';
            const currentCharacteristic =
                userSession.selectedCharacteristics[userSession.currentCharacteristicIndex];
            const choiceIndex = parseInt(normalizedInput) - 1;

            if (choiceIndex >= 0 && choiceIndex < currentCharacteristic.choices.length) {
                const selectedChoice = currentCharacteristic.choices[choiceIndex];
                currentCharacteristic.selectedChoice = selectedChoice;

                userSession.currentCharacteristicIndex++;
                if (userSession.currentCharacteristicIndex < userSession.selectedCharacteristics.length) {
                    const nextCharacteristic =
                        userSession.selectedCharacteristics[userSession.currentCharacteristicIndex];
                    const response = isEnglish
                        ? `You selected "${selectedChoice}" for "${currentCharacteristic.characteristic_name}".\n\nNow, please choose an option for "${nextCharacteristic.characteristic_name}":\n` +
                        nextCharacteristic.choices.map((choice, index) => `${index + 1}️⃣ ${choice}`).join('\n')
                        : `لقد اخترت "${selectedChoice}" لـ "${currentCharacteristic.characteristic_name}".\n\nالآن، يرجى اختيار خيار لـ "${nextCharacteristic.characteristic_name}":\n` +
                        nextCharacteristic.choices.map((choice, index) => `${index + 1}️⃣ ${choice}`).join('\n');

                    await client.sendMessage(msg.from, response);
                } else {
                    userSession.stage = 'awaiting_target_number';
                    const summary = userSession.selectedCharacteristics
                        .map(
                            (char) =>
                                `${char.characteristic_name}: ${char.selectedChoice || (isEnglish ? 'No choice made' : 'لم يتم الاختيار')}`
                        )
                        .join('\n');
                    const response = isEnglish
                        ? `You completed the selection:\n${summary}\n\nPlease enter the recipient’s phone number (start with the country code, without 00 or +):`
                        : `لقد أكملت التقييم:\n${summary}\n\nيرجى إدخال رقم الهاتف لإرسال هذا التقييم (ابدأ برمز الدولة، بدون 00 أو +):`;

                    await client.sendMessage(msg.from, response);
                }
            } else {
                const response = isEnglish
                    ? "Invalid selection. Please select a valid number."
                    : "اختيار غير صالح. يرجى اختيار رقم صالح.";
                await client.sendMessage(msg.from, response);
            }
            return;
        }

        // Awaiting target number
        if (userSession.stage === 'awaiting_target_number') {
            const normalizedInput = normalizeNumber(msg.body);

            const isEnglish = userSession.language === 'en';
            const targetNumber = normalizedInput;

            if (/^\d+$/.test(targetNumber)) {
                const summary = userSession.selectedCharacteristics
                    .map(
                        (char) =>
                            `${char.characteristic_name}: ${char.selectedChoice || (isEnglish ? 'No choice made' : 'لم يتم الاختيار')}`
                    )
                    .join('\n');
                const messageToSend = isEnglish
                    ? `Hello! 🤗,\n\nYou’ve received anonymous feedback through Smell Checkmate::\n\n${summary}\nThis is a private note to help you improve and maintain your personal care. 📝\nWant to rate others? Use the Smell Checkmate Chatbot to share constructive feedback anonymously!\nThank you for being part of a kinder, more aware community. ✨✨ `
                    : `
مرحبًا! 🤗
لقد تلقيت ملاحظات مجهولة المصدر من خلال Smell Checkmate: 
${summary}
هذه رسالة خاصة لمساعدتك على تحسين والحفاظ على روتين العناية الشخصية الخاص بك. 📝 
هل تريد تقييم الآخرين؟ استخدم روبوت Smell Checkmate لمشاركة ملاحظات بناءة بسرية!
شكرًا لكونك جزءًا من مجتمع أكثر وعيًا ولطفًا. ✨✨


                  `;

                //post request yo register 
                const logPayload = {
                    user: userNumber, // Phone numbser of the user
                    timestamp: new Date().toISOString(), // Current datetime in ISO format
                    recipient: targetNumber, // Target phone number
                    assesment: summary // The whole assessment
                };
                // console.log(sm, "payload");
                await client.sendMessage(`${targetNumber}@c.us`, messageToSend);
                await client.sendMessage(
                    msg.from,
                    isEnglish ?
                        `
Your rating has been sent anonymously and privately. ✅
Thank you for helping promote better hygiene and self-awareness! 👌

If you’d like to rate someone else, type 'start.'
`
                        :

                        `
تم إرسال تقييمك بشكل مجهول وسري. ✅           
شكرًا لمساهمتك في تعزيز النظافة الشخصية وزيادة الوعي!  👌
إذا كنت ترغب في تقييم شخص آخر، اكتب "ابدأ".
`

                );
                console.log(messageToSend, summary, "a");



                try {
                    // Make POST request to the endpoint
                    const response = await axios.post('http://62.72.57.75:4000/add-log', logPayload, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log("Log added successfully:", response.data);
                    delete userSelections[userNumber];
                } catch (error) {
                    console.error("Error adding log:", error.message);
                    delete userSelections[userNumber];
                }


            } else {
                const response = isEnglish
                    ? "Invalid phone number. Please enter a valid numeric phone number with country code."
                    : "رقم الهاتف غير صالح. يرجى إدخال رقم هاتف صالح مع رمز الدولة.";
                await client.sendMessage(msg.from, response);
            }
            return;
        }
    });

// Handle client disconnection
client.on('disconnected', async(reason) => {
    console.log('Client disconnected:', reason);
  
    client.initialize();

  
});


});


//SSE endpoint to push updates
app.get("/updates", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Periodically check for authentication
    const interval = setInterval(() => {
        if (!authenticated && qrcoding != "") {
            res.write(`data: qrgenerated\n\n`);
            // res.sendFile(__dirname + "/index2.html");
            clearInterval(interval);
        }
        if (authenticated && qrcoding === "") {
            res.write(`data: authenticated\n\n`);
            // res.sendFile(__dirname + "/index2.html");
            clearInterval(interval);
        }
        if (authenticated && qrcoding != "") {
            res.write(`data: firstauthenticated\n\n`);
            // res.sendFile(__dirname + "/index2.html");
            clearInterval(interval);
        }
    }, 1000);

    req.on("close", () => clearInterval(interval)); // Cleanup on client disconnect
});

app.post("/submit", (req, res) => {
    exec(" pkill -f chromium-browser", (error, stdout, stderr) => {
        console.log('Executing command...');

        if (error) {
            console.error(`Error executing command: ${error.message}`);
        }
        if (stderr) {
            console.warn(`Command stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
    });
    console.log(req.body);
    // const message = req.body.message;
    const phoneNumber = req.body.phoneNumber;
    res.redirect("/authenticate/" + phoneNumber);
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

arCharacteristics = loadArCharacteristics();
enCharacteristics = loadEnCharacteristics();
// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
