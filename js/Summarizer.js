// ChatGPT APIのエンドポイントURL
const API_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";
// ChatGPT APIの認証トークン
const API_KEY = "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";


// ページをロードした時に実行される関数
window.onload = function () {
  // WebページのURLを取得する
  const url = window.location.href;
  // APIに送信するデータを準備する
  const data = {
    "prompt": 'summarize the webpage at `${url}` and translate it into Japanese. +\nOnly Japanese is output.',
    "temperature": 0.7,
    "max_tokens": 100,
    "n": 1,
    "stop": "\n"
  };
  // APIにリクエストを送信する
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // APIから受け取った要約を四角枠に表示する
      const summary = data.choices[0].text.trim();
      const rectangle = document.createElement("div");
      rectangle.style.position = "fixed";
      rectangle.style.top = "0";
      rectangle.style.left = "0";
      rectangle.style.width = "100%";
      rectangle.style.height = "50px";
      rectangle.style.backgroundColor = "#fff";
      rectangle.style.border = "1px solid #000";
      rectangle.style.padding = "10px";
      rectangle.innerHTML = `<strong>Webページの要約:</strong> ${summary}`;
      document.body.appendChild(rectangle);
    })
    .catch(error => console.error(error));
};