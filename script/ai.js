const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  description: "An AI command powered by Hercai",
  usage: "hercai [prompt]",
  credits: 'Developer',
  cooldown: 3,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`AI | 📑✨\n━━━━━━━━━━━\n\n𝙿𝚘𝚜𝚎𝚛 𝚟𝚘𝚝𝚛𝚎 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗..💭`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`📝 Please wait......\n━━━━━━━━━━━\n "${input}"`, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      content: input
    });
    api.sendMessage('AI | 📑✨:\n━━━━━━━━━━━\n\n' + response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝.', event.threadID, event.messageID);
  }
};
