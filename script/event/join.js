module.exports.config = {
  name: "join",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "ryuko",
  description: "✨ Join and welcome notification ✨",
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function ({ api, event, Threads, botname, prefix }) {
  const { join } = global.nodemodule["path"];
  const { threadID } = event;
  const data = (await Threads.getData(event.threadID)).data || {};
  const checkban = data.banOut || [];
  const botID = await api.getCurrentUserID();

  if (checkban.includes(checkban[0])) return;
  else if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`${botname} AI 🤖`, threadID, botID);
    return api.sendMessage(
      `✨ 𝗕𝗼𝘁 𝗰𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆! ✨\n\n📌 𝗔𝗯𝗼𝘂𝘁 𝗺𝗲:\n➛ 𝗕𝗼𝘁 𝗻𝗮𝗺𝗲 : ${botname}\n➛ 𝗣𝗿𝗲𝗳𝗶𝘅 : ${prefix}\n\n📊 𝗕𝗼𝘁 𝗱𝗮𝘁𝗮:\n➛ 𝗨𝘀𝗲𝗿𝘀 : ${global.data.allUserID.length}\n➛ 𝗚𝗿𝗼𝘂𝗽𝘀 : ${global.data.allThreadID.get(botID).length}\n\n🔍 𝗛𝗼𝘄 𝘁𝗼 𝘂𝘀𝗲:\n➛ ${prefix}help (𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗹𝗶𝘀𝘁)\n➛ ai (𝗔𝗻𝘆 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻) ➝ 𝗡𝗼 𝗽𝗿𝗲𝗳𝗶𝘅\n➛ talk (𝗔𝗻𝘆 𝘁𝗲𝘅𝘁) ➝ 𝗡𝗼 𝗽𝗿𝗲𝗳𝗶𝘅\n\n✨ 𝗔𝗻𝗼𝘁𝗵𝗲𝗿-𝗠𝗲 ✨`,
      threadID
    );
  } else {
    try {
      const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      let mentions = [],
        nameArray = [],
        memLength = [],
        i = 0;

      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
      }
      memLength.sort((a, b) => a - b);

      (typeof threadData.customJoin == "undefined") ? msg = "👋 Hello, {name}! Welcome to {threadName} 🎉." : msg = threadData.customJoin;
      msg = msg
        .replace(/\{name}/g, nameArray.join(", "))
        .replace(/\{type}/g, memLength.length > 1 ? "friends" : "you")
        .replace(/\{soThanhVien}/g, memLength.join(", "))
        .replace(/\{threadName}/g, threadName);

      let formPush = { body: `🎉 ${msg} 🎉`, mentions };
      return api.sendMessage(formPush, threadID);
    } catch (e) {
      console.log(e);
    }
  }
};
		      
