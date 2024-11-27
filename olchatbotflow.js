// client.on('message', async (msg) => {
//     const userNumber = msg.from.replace('@c.us', ''); // Extract phone number

//     if (msg.body === 'start') {
//         // Start interaction and show the first menu
//         const characteristics = loadCharacteristics();

//         // Initialize session for the user
//         userSelections[userNumber] = {
//             stage: 'selecting_characteristic',
//             characteristics,
//         };

//         // Display characteristics menu
//         let response = "Please select a characteristic:\n";
//         characteristics.forEach((item, index) => {
//             response += `${index + 1}. ${item.characteristic_name}\n`;
//         });

//         await client.sendMessage(msg.from, response);
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'selecting_characteristic'
//     ) {
//         // Handle characteristic selection
//         const characteristics = userSelections[userNumber].characteristics;
//         const choiceIndex = parseInt(msg.body) - 1;

//         if (choiceIndex >= 0 && choiceIndex < characteristics.length) {
//             const selectedCharacteristic = characteristics[choiceIndex];
//             userSelections[userNumber].selectedCharacteristic = selectedCharacteristic;
//             userSelections[userNumber].stage = 'selecting_choice';

//             // Display choices for the selected characteristic
//             let response = `You selected "${selectedCharacteristic.characteristic_name}". Please choose an option:\n`;
//             selectedCharacteristic.choices.forEach((choice, index) => {
//                 response += `${index + 1}. ${choice}\n`;
//             });

//             await client.sendMessage(msg.from, response);
//         } else {
//             await client.sendMessage(msg.from, "Invalid selection. Please select a valid number.");
//         }
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'selecting_choice'
//     ) {
//         // Handle choice selection
//         const { selectedCharacteristic } = userSelections[userNumber];
//         const choiceIndex = parseInt(msg.body) - 1;

//         if (choiceIndex >= 0 && choiceIndex < selectedCharacteristic.choices.length) {
//             const selectedChoice = selectedCharacteristic.choices[choiceIndex];
//             userSelections[userNumber].selectedChoice = selectedChoice;
//             userSelections[userNumber].stage = 'awaiting_target_number';

//             // Ask for the target phone number
//             await client.sendMessage(
//                 msg.from,
//                 `You selected "${selectedChoice}". Please enter the phone number to send the assessment to:`
//             );
//         } else {
//             await client.sendMessage(msg.from, "Invalid selection. Please select a valid number.");
//         }
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'awaiting_target_number'
//     ) {
//         // Handle phone number input
//         const targetNumber = msg.body;

//         if (/^\d+$/.test(targetNumber)) {
//             const { selectedCharacteristic, selectedChoice } = userSelections[userNumber];

//             const messageToSend = `Assessment:\n- ${selectedCharacteristic.characteristic_name}: ${selectedChoice}`;
//             await client.sendMessage(`${targetNumber}@c.us`, messageToSend);
//             await client.sendMessage(msg.from, "Your assessment has been sent. Thank you!");

//             // Clear user session
//             delete userSelections[userNumber];
//         } else {
//             await client.sendMessage(msg.from, "Invalid phone number. Please enter a valid numeric phone number.");
//         }
//     } else {
//         // Default fallback for unexpected inputs
//         await client.sendMessage(
//             msg.from,
//             "I didn't understand that. Please type `!start` to begin the interaction."
//         );
//     }
// });

// WhatsApp Message Flow
//was good one for refernce
// client.on('message', async (msg) => {
//     const userNumber = msg.from.replace('@c.us', ''); // Extract phone number

//     if (msg.body === 'start') {
//         // Start interaction and show the first menu
//         const characteristics = loadCharacteristics();

//         // Initialize session for the user
//         userSelections[userNumber] = {
//             stage: 'selecting_characteristic',
//             characteristics,
//             selectedCharacteristics: [],
//             currentCharacteristicIndex: 0,
//         };

//         // Display characteristics menu
//         let response = "Please select one or more characteristics (e.g... type ,1, (1,2) or 'all'):\n";
//         characteristics.forEach((item, index) => {
//             response += `${index + 1}. ${item.characteristic_name}\n`;
//         });
//         response += `\nType 'all' to select all characteristics.`;

//         await client.sendMessage(msg.from, response);
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'selecting_characteristic'
//     ) {
//         // Handle characteristic selection
//         const characteristics = userSelections[userNumber].characteristics;

//         let selectedIndexes = [];
//         if (msg.body.toLowerCase() === 'all') {
//             selectedIndexes = [...Array(characteristics.length).keys()]; // Select all indices
//         } else {
//             // Parse user input into indices
//             selectedIndexes = msg.body
//                 .split(',')
//                 .map((num) => parseInt(num.trim()) - 1)
//                 .filter((index) => index >= 0 && index < characteristics.length);
//         }

//         if (selectedIndexes.length > 0) {
//             userSelections[userNumber].selectedCharacteristics = selectedIndexes.map(
//                 (index) => characteristics[index]
//             );
//             userSelections[userNumber].stage = 'selecting_choices';
//             userSelections[userNumber].currentCharacteristicIndex = 0;

//             // Start presenting choices for the first characteristic
//             const firstCharacteristic =
//                 userSelections[userNumber].selectedCharacteristics[0];
//             let response = `You selected "${firstCharacteristic.characteristic_name}". Please choose an option:\n`;
//             firstCharacteristic.choices.forEach((choice, index) => {
//                 response += `${index + 1}. ${choice}\n`;
//             });

//             await client.sendMessage(msg.from, response);
//         } else {
//             await client.sendMessage(
//                 msg.from,
//                 "Invalid selection. Please select valid numbers or type 'all'."
//             );
//         }
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'selecting_choices'
//     ) {
//         // Handle choice selection for the current characteristic
//         const userSession = userSelections[userNumber];
//         const currentCharacteristic =
//             userSession.selectedCharacteristics[userSession.currentCharacteristicIndex];
//         const choiceIndex = parseInt(msg.body) - 1;

//         if (choiceIndex >= 0 && choiceIndex < currentCharacteristic.choices.length) {
//             const selectedChoice = currentCharacteristic.choices[choiceIndex];
//             currentCharacteristic.selectedChoice = selectedChoice;

//             // Move to the next characteristic or finish
//             userSession.currentCharacteristicIndex++;
//             if (
//                 userSession.currentCharacteristicIndex <
//                 userSession.selectedCharacteristics.length
//             ) {
//                 // Present options for the next characteristic
//                 const nextCharacteristic =
//                     userSession.selectedCharacteristics[userSession.currentCharacteristicIndex];
//                 let response = `You selected "${selectedChoice}" for "${currentCharacteristic.characteristic_name}".\n\nNow, please choose an option for "${nextCharacteristic.characteristic_name}":\n`;
//                 nextCharacteristic.choices.forEach((choice, index) => {
//                     response += `${index + 1}. ${choice}\n`;
//                 });

//                 await client.sendMessage(msg.from, response);
//             } else {
//                 // Finish and ask for the target phone number
//                 userSession.stage = 'awaiting_target_number';

//                 const summary = userSession.selectedCharacteristics
//                     .map(
//                         (char) =>
//                             `- ${char.characteristic_name}: ${char.selectedChoice || "No choice made"
//                             }`
//                     )
//                     .join('\n');

//                 await client.sendMessage(
//                     msg.from,
//                     `You completed the selection:\n${summary}\n\nPlease enter the phone number to send this assessment to \n phone number  should start with country code without 00 or +:`
//                 );
//             }
//         } else {
//             await client.sendMessage(msg.from, "Invalid selection. Please select a valid number.");
//         }
//     } else if (
//         userSelections[userNumber] &&
//         userSelections[userNumber].stage === 'awaiting_target_number'
//     ) {
//         // Handle phone number input
//         const targetNumber = msg.body;

//         if (/^\d+$/.test(targetNumber)) {
//             const userSession = userSelections[userNumber];
//             const summary = userSession.selectedCharacteristics
//                 .map(
//                     (char) =>
//                         `- ${char.characteristic_name}: ${char.selectedChoice || "No choice made"
//                         }`
//                 )
//                 .join('\n');

//             const messageToSend = ` Hello\n have a good day \n you have got the following Assessment from someone  \n${summary}`;
//             await client.sendMessage(`${targetNumber}@c.us`, messageToSend);
//             await client.sendMessage(msg.from, "Your assessment has been sent. Thank you!");

//             // Clear user session
//             delete userSelections[userNumber];
//         } else {
//             await client.sendMessage(msg.from, "Invalid phone number. Please enter a valid numeric phone number with country code without 00 or + .");
//         }
//     } else {
//         // Default fallback for unexpected inputs
//         await client.sendMessage(
//             msg.from,
//             " Please type `start` to begin the assessment."
//         );
//     }
// });