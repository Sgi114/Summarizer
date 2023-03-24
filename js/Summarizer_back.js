const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const API_KEY = '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';

app.get('/', (req, res) => {
    res.send('こんにちは、佳祐ｸﾝ！');
});

// 非同期でリクエスト：https://stackoverflow.com/a/48629506
async function asyncRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => resolve({ error, response, body }));
    });
}

// ChatGPTのAPIを呼び出すメソッド
async function getChatGPT(apiKey, message) {
    try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const messages = [{ 'role': 'user', 'content': message }];
        const headers = {
            'Authorization': 'Bearer ' + apiKey,
            'Content-type': 'application/json',
            'X-Slack-No-Retry': 1
        };
        const options = {
            url: apiUrl,
            'headers': headers,
            'method': 'POST',
            'body': JSON.stringify({
                'model': 'gpt-3.5-turbo',
                'max_tokens': 100,
                'temperature': 0.7,
                "n": 1,
                'messages': messages
            })
        };
        const response = await asyncRequest(options)
        const responseJson = JSON.parse(response.response.body)
        const resultMessage = responseJson.choices[0].message.content.trim()
        return resultMessage
    } catch (e) {
        console.error("APIから要約を受け取れませんでした", e)
        return undefined
    }
}

app.post('/api/summarize', async (req, res) => {
    // クエリパラメータ取得：https://nodejs.keicode.com/nodejs/express-params-query.php
    const prompt = `summarize the webpage at ${req.query.url} and translate it into Japanese. +\nOnly Japanese is output.`
    const message = await getChatGPT(API_KEY, prompt)
    res.json({ message });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
