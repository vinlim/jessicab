// index.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

// parse JSON bodies
app.use(express.json());

app.post('/slack/events', (req, res) => {
    const payload = req.body;

    // 1) URL verification challenge
    if (payload.type === 'url_verification' && payload.challenge) {
        return res.json({ challenge: payload.challenge });
    }

    // 2) Otherwise, log the event payload
    const logLine = JSON.stringify(payload) + '\n';
    const logFile = path.resolve('./slack-events.log');

    if(payload.event?.type === "app_mention") {
        console.log(payload.event.text)
    }

    fs.appendFile(logFile, logLine, err => {
        if (err) {
            console.error('❌ Failed to write Slack event:', err);
        }
    });

    // 3) Acknowledge receipt
    res.status(200).send();
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`⚡️ Slack event receiver listening on port ${PORT}`);
});
