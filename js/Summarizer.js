// ChatGPTのAPIを呼び出すメソッド
async function getChatGPT(url) {
  try {
    const apiUrl = 'http://localhost:3000/api/summarize';
    const headers = {
      'Content-type': 'application/json',
      'X-Slack-No-Retry': 1
    };
    const options = {
      'headers': headers,
      'method': 'POST',
    };
    const query = {
      "url": url
    }
    const queryParams = new URLSearchParams(query);
    const apiUrlWithQuery = `${apiUrl}?${queryParams}`
    const response = await fetch(apiUrlWithQuery, options)
    const responseJson = await response.json()
    return responseJson.message
  } catch (e) {
    console.error("APIから要約を受け取れませんでした")
    return undefined
  }
}

// ページをロードした時に実行されるメソッド
window.onload = async function () {
  const websiteUrl = window.location.href;
  const summary = await getChatGPT(websiteUrl)
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
