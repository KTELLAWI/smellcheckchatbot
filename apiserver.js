const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
app.use(express.json());

// Directus API Base URL and Access Token
const DIRECTUS_BASE_URL = 'http://62.72.57.75:8055';
const DIRECTUS_BASE_URL1 = 'http://62.72.57.75:8055/items';

const ACCESS_TOKEN = 'T-kYlNv-HfygZr9wUX2D49jkD5h9WbuB';

// Collection endpoints
const COLLECTION_ENDPOINTS = {
    characteristics_ar: `${DIRECTUS_BASE_URL1}/Characteristics_ar?access_token=${ACCESS_TOKEN}`,
    characteristics_en: `${DIRECTUS_BASE_URL1}/Characteristics?access_token=${ACCESS_TOKEN}`,
    users: `${DIRECTUS_BASE_URL}/items/users?access_token=${ACCESS_TOKEN}`,
    logs: `${DIRECTUS_BASE_URL}/items/logs?access_token=${ACCESS_TOKEN}`,
};

// Helper function to fetch data and write to file
const fetchDataAndWriteToFile = async (url, filePath) => {
    try {
        const response = await axios.get(url);
        const data = response.data.data;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Data written to ${filePath}`);
    } catch (error) {
        console.error(`Failed to fetch or write data: ${error.message}`);
    }
};

// Fetch and write data on server start
fetchDataAndWriteToFile(COLLECTION_ENDPOINTS.characteristics_ar, './characteristics_ar.json');
fetchDataAndWriteToFile(COLLECTION_ENDPOINTS.characteristics_en, './characteristics_en.json');

// Endpoint to add or update a user in the "users" collection
app.post('/add-user', async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.phone_number) {
            return res.status(400).json({ error: 'Phone number is required.' });
        }

        // Check if user exists
        const existingUserResponse = await axios.get(
            `${COLLECTION_ENDPOINTS.users}&filter[phone_number][_eq]=${userData.phone_number}`
        );
        const existingUser = existingUserResponse.data.data[0];

        if (existingUser) {
            // Update existing user
            const updateResponse = await axios.patch(
                `${DIRECTUS_BASE_URL1}/users/${existingUser.id}?access_token=${ACCESS_TOKEN}`,
                userData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            return res.status(200).json({
                message: 'User updated successfully',
                data: updateResponse.data,
            });
        } else {
            // Create new user
            const createResponse = await axios.post(COLLECTION_ENDPOINTS.users, userData, {
                headers: { 'Content-Type': 'application/json' },
            });

            return res.status(201).json({
                message: 'User created successfully',
                data: createResponse.data,
            });
        }
    } catch (error) {
        console.error('Error processing user:', error.message);
        res.status(500).json({ error: 'Failed to process user data.' });
    }
});

// Endpoint to add a log entry in the "logs" collection
app.post('/add-log', async (req, res) => {
    try {
        const logData = req.body;

        // Validate required fields
        if (!logData.user || !logData.timestamp || !logData.recipient || !logData.assesment) {
            return res.status(400).json({ error: 'All fields are required: user, timestamp, recipient, assesment.' });
        }

        // Create log entry
        const response = await axios.post(COLLECTION_ENDPOINTS.logs, logData, {
            headers: { 'Content-Type': 'application/json' },
        });

        res.status(201).json({
            message: 'Log entry created successfully',
            data: response.data,
        });
    } catch (error) {
        console.error('Error creating log entry:', error.message);
        res.status(500).json({ error: 'Failed to create log entry.' });
    }
});

const { exec } = require('child_process');

// Endpoint to execute a shell command
app.post('/execute', (req, res) => {
    console.log('Request received at /execute endpoint');

    exec("pm2 restart 1 && pm2 restart 0", (error, stdout, stderr) => {
        console.log('Executing command...');

        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return res.status(500).send({ error: `Error executing command: ${error.message}` });
        }
        if (stderr) {
            console.warn(`Command stderr: ${stderr}`);
            return res.status(200).send({ stderr: stderr.trim(), message: "Command executed with warnings." });
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).send({ output: stdout.trim(), message: "Command executed successfully." });
    });
});





// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
