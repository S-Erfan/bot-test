// TESTBOT : saymynameTst_bot
require("dotenv").config();

const express = require("express");
const axios = require("axios");

const { TOKEN, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;
 
const app = express();

app.use(express.json());


const initialTelegramBot = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setwebhook?url=${WEBHOOK_URL}`);
    console.log(res)
}

app.post(URI, async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text
    });

    return res.json()
})

app.listen(process.env.PORT || 4000,async () => {
    console.log(`server is running on port ${process.env.PORT || 4000}`);
    await initialTelegramBot();
})
