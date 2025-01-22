module.exports.config = {
  name: "help",
  version: "1.0.2",
  permission: 0,
  credits: "Metoushela",
  description: "beginner's guide",
  prefix: true,
  premium: false,
  category: "guide",
  usages: "[Shows Commands]",
  cooldowns: 5,
};

module.exports.languages = {
  english: {
    moduleInfo:
      "✨ %1 ✨\n\n%2\n\n➛ 𝗨𝘀𝗮𝗴𝗲 : %3\n➛ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 : %4\n➛ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻 : %5 second(s)\n➛ 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 : %6\n\n🌟 𝗖𝗿𝗲𝗮𝘁𝗲𝗱 𝗯𝘆 : Metoushela 🌟",
    helpList: `🔍 𝗧𝗵𝗲𝗿𝗲 𝗮𝗿𝗲 %1 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 𝗮𝗻𝗱 %2 𝗰𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀`,
    user: "👤 User",
    adminGroup: "👥 Group Admin",
    adminBot: "🤖 Bot Admin",
  },
};

module.exports.handleEvent = function ({ api, event, getText, botname, prefix }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const command = commands.get(splitBody[1].toLowerCase());
  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${
        command.config.usages ? command.config.usages : ""
      }`,
      command.config.category,
      command.config.cooldowns,
      command.config.permission === 0
        ? getText("user")
        : command.config.permission === 1
        ? getText("adminGroup")
        : getText("adminBot"),
      command.config.credits
    ),
    threadID,
    messageID
  );
};

module.exports.run = async function ({ api, event, args, getText, botname, prefix }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;

  const command = commands.get((args[0] || "").toLowerCase());
  const autoUnsend = true;
  const delayUnsend = 60;

  if (!command) {
    const commandList = Array.from(commands.values());
    const categories = new Set(commandList.map((cmd) => cmd.config.category.toLowerCase()));
    const categoryCount = categories.size;

    const categoryNames = Array.from(categories);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    let currentPage = 1;
    if (args[0]) {
      const parsedPage = parseInt(args[0]);
      if (!isNaN(parsedPage) && parsedPage >= 1 && parsedPage <= totalPages) {
        currentPage = parsedPage;
      } else {
        return api.sendMessage(
          `❌ Oops, you went too far! Please choose a page between 1 and ${totalPages}.`,
          threadID,
          messageID
        );
      }
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const visibleCategories = categoryNames.slice(startIdx, endIdx);

    let msg = `✨ 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀 & 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀 ✨\n━━━━━━━━━━━━━━━━━━━\n\n`;
    for (let i = 0; i < visibleCategories.length; i++) {
      const category = visibleCategories[i];
      const categoryCommands = commandList.filter(
        (cmd) => cmd.config.category.toLowerCase() === category
      );
      const commandNames = categoryCommands.map((cmd) => cmd.config.name);
      msg += `🌟 ${category.charAt(0).toUpperCase() + category.slice(1)}:\n`;
      msg += `\t⋆☘️⋆ ${commandNames.join("\n\t⋆☘️⋆ ")}\n\n`;
    }

    msg += `📖 Page ${currentPage} of ${totalPages}\n`;
    msg += getText("helpList", commands.size, categoryCount);

    api.sendMessage(msg, threadID, messageID);
  } else {
    return api.sendMessage(
      getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${
          command.config.usages ? command.config.usages : ""
        }`,
        command.config.category,
        command.config.cooldowns,
        command.config.permission === 0
          ? getText("user")
          : command.config.permission === 1
          ? getText("adminGroup")
          : getText("adminBot"),
        command.config.credits
      ),
      threadID,
      async (error, info) => {
        if (autoUnsend) {
          await new Promise((resolve) =>
            setTimeout(resolve, delayUnsend * 1000)
          );
          return api.unsendMessage(info.messageID);
        }
      },
      messageID
    );
  }
};
          
