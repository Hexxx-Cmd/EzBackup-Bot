const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { mainprefix , token, attention, permission, messagesfetchlimts, yes, arrowhere, botlog } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "help",
    description: "Load Your Guild Backup",
 
     run: async (client, message, args) => {
 let inviteebed = new Discord.MessageEmbed()
 .setAuthor(client.user.username, client.user.displayAvatarURL())
 .addField(`${mainprefix}create`, 'To Create Backup', true)
 .addField(`${mainprefix}remove <backupid>`, 'to delete backup from the database', true)
 .addField(`${mainprefix}info <backupid>`, 'To Show Backup INFO', true)
 .addField(`${mainprefix}load <backupid>`, 'To Load Backup', true)
 .addField(`${mainprefix}invite`, 'to get my invite link', true)

.setFooter(message.author.username, message.author.displayAvatarURL())   
message.channel.send(inviteebed)
}
  }