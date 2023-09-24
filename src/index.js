require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log('the bot is ready');
});

client.on('messageCreate', (msg) => {
    if (msg.content === "!searchanime") {
        if (msg.attachments.first()) {
        if (msg.attachments.first().contentType === 'image/jpeg' || msg.attachments.first().contentType === 'image/png') {
            (async() => {
                try{
      const response = await fetch(
  `https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(
    msg.attachments.first().url
  )}`
    
);
const data = await response.json();

// console.log(data);
const titleobj = data.result[0].anilist.title;
    const romajiTitle = titleobj.romaji;
    const vidUrl = data.result[0].video;

    const message1 = msg.reply(
      "romaji title: " +
        romajiTitle +
        "\n english title: " +
        titleobj.english +
        "\n MAL id: " +
        data.result[0].anilist.idMal +
        "\n episode: " +
        data.result[0].episode
    );

    const message2 = msg.channel.send({
      files: [
        {
          attachment: vidUrl,
          name: data.result[0].anilist.idMal + ".mp4",
        },
      ],
      content: 'scene of ' + titleobj.english,
    });

    await Promise.all([message1, message2]);
                } catch (err) {
                    console.log(err);
                }
            
}) ();
    } else {
        msg.reply('Unsupported picture format, only jpg and png allowed!');
    }
} else {
    msg.reply('please provide with image');
}
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'random') {
        let randMultiply = Math.floor(Math.random() * 100 * Math.random() * 100);
        interaction.reply('the number is ' + randMultiply);
    }
})

client.login(process.env.TOKEN);