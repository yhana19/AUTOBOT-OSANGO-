module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "ryuko",
  prefix: true,
  description: "guide",
  category: "system",
  premium: false,
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads, prefix}) => {
  var { threadID, messageID, body, senderID } = event;
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["mpre","mprefix","prefix", "info", "What is the prefix of the bot?","PREFIX"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
		
      if (config.prefix == null) {
        return out(`✨ 𝗔𝗻𝗼𝘁𝗵𝗲𝗿-𝗠𝗲\n━━━━━━━━━━━\nbot prefix is : ${prefix}`)
      }
      else return out(`✨ 𝗔𝗻𝗼𝘁𝗵𝗲𝗿-𝗠𝗲\n━━━━━━━━━━━\n bot prefix is : ${prefix}`)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("no prefix commands", event.threadID)
}
