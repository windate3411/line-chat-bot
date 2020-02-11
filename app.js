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
  const regrex = /你|誰|介紹|you|yourself|hello|你好|hi/gi
  if (regrex.test(event.message.text)) {
    event.reply('我是Danny,剛結束長達9個月的全端網路開發課程，熱愛教育與電商平台，正在積極尋找網路開發的職缺!對我有興趣的話可以參考我的履歷 https://www.cakeresume.com/s03411')
  } else if ((/教育/gi).test(event.message.text)) {
    event.reply('我自己從大學時期就開始了一連串的補教生涯，家教、補習班老師甚至是skype線上教學都是我日常的一部分，我很喜歡協助他人學習知識的感覺，尤其收到學生的回饋時更是讓我覺得自己的一切努力都真切地影響到他們。日後也希望繼續盡我所能將這樣的正向影響帶給更多人')
  } else {
    switch (event.message.text) {
      case 'Danny':
        event.reply('叫我幹嘛?莫非你對我有興趣嗎:D')
        break;
      default:
        event.reply('我聽不懂你在說什麼欸!問點別的嘛!')
        break;
    }
  }
});

app.post('/', linebotParser);
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server start')
});

