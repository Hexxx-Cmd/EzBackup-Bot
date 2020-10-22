const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { mainprefix , token, attention, permission, messagesfetchlimts, yes, arrowhere, botlog } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "invite",
    description: "Load Your Guild Backup",
 
     run: async (client, message, args) => {
 let inviteebed = new Discord.MessageEmbed()
 .setAuthor(client.user.username, client.user.displayAvatarURL())
 .setDescription(`${arrowhere} [Click Here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
.setFooter(message.author.username, message.author.displayAvatarURL())   
message.channel.send(inviteebed)
}
  }