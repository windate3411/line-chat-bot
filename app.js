// 建立express伺服器
const express = require('express')
const app = express()

// 引用linebot SDK
var linebot = require('linebot');

// 判別開發環境使用環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 用於辨識Line Channel的資訊
var bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
});

const linebotParser = bot.parser();

// 當有人傳送訊息給Bot時
bot.on('message', function (event) {
  // event.message.text是使用者傳給bot的訊息
  const regrex = /你|誰|介紹|you|yourself/
  if (regrex.test(event.message.text)) {
    event.reply('我是Danny,剛結束長達9個月的全端網路開發課程，熱愛教育與電商平台，正在積極尋找網路開發的職缺!')
  } else {
    switch (event.message.text) {
      case 'Danny':
        event.reply('Danny 是個好可愛的人喔')
        break;
      default:
        event.reply('我聽不懂你在說什麼欸!問點別的嘛!')
        break;
    }
  }
  // event.reply(replyMsg).then(function (data) {
  //   // 當訊息成功回傳後的處理
  // }).catch(function (error) {
  //   // 當訊息回傳失敗後的處理
  // });
});

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});

