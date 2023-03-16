// ChatGPT APIの認証トークン
const API_KEY = "＜APIキーを入力＞";

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
      // 'muteHttpExceptions': true,
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
    const response = await fetch(apiUrl, options)
    const responseJson = await response.json()
    return responseJson.choices[0].message.content.trim()
  } catch (e) {
    console.error("APIから要約を受け取れませんでした")
    return undefined
  }
}

// ページをロードした時に実行されるメソッド
window.onload = async function () {
  const websiteUrl = window.location.href;

  const prompt = `summarize the webpage at ${websiteUrl} and translate it into Japanese. +\nOnly Japanese is output.`
  const summary = await getChatGPT(API_KEY, prompt)
  console.log("確認:", summary);

  if (summary === undefined) {
    return
  }

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
};
