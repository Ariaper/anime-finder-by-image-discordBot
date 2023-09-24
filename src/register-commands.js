require('dotenv').config();
const {REST, Routes} = require('discord.js');
const commands = [{
    name: 'random',
    description: 'gives you a random number',
}]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async() => {
    try {
        console.log('registering...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )
        console.log('registered!');
    } catch (error) {
console.log(error);
    }
}) ();