console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token, messagesfetchlimts, status, botlog } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { join } = require('path');
const { readdirSync } = require('fs');
client.commands= new Discord.Collection();
client.login(token)

  
client.on('ready', () => {
    client.channels.cache.get(botlog).send(`** Bot Is Running**\n Servers: ${client.guilds.cache.size} And ${client.users.cache.size} Users`)
    client.user.setActivity(status, { type: 'PLAYING' });
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', `
    ▓█████▄  ▄▄▄       ██▀███   ██ ▄█▀  
  ▒██▀ ██▌▒████▄    ▓██ ▒ ██▒ ██▄█▒   
  ░██   █▌▒██  ▀█▄  ▓██ ░▄█ ▒▓███▄░   
  ░▓█▄   ▌░██▄▄▄▄██ ▒██▀▀█▄  ▓██ █▄   
  ░▒████▓  ▓█   ▓██▒░██▓ ▒██▒▒██▒ █▄  
   ▒▒▓  ▒  ▒▒   ▓▒█░░ ▒▓ ░▒▓░▒ ▒▒ ▓▒   
   ░ ▒  ▒   ▒   ▒▒ ░  ░▒ ░ ▒░░ ░▒ ▒░     
   ░ ░  ░   ░   ▒     ░░   ░ ░ ░░ ░      
     ░          ░  ░   ░     ░  ░       
   ░                                                                                 `);
  console.log('\n\x1b[32m%s\x1b[0m', `          $[INFO]: Logged on ${client.user.tag}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[INFO]: PREFIX ${mainprefix}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[EXTRA]: EZBACKUP`);  

  console.log('\n\x1b[31m%s\x1b[0m', `           $[HOW]: To Check Commands List Type ${mainprefix}help`);  
  console.log('\x1b[31m%s\x1b[0m', `            $[CREDITS]: Made By DarkBoy/DarkMisehl YT`);  
  console.log('\x1b[31m%s\x1b[0m', `            $[SUPPORT]: DarkDevs: https://discord.gg/rSvmYx8 `);  

 });

 const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
               if (!command) command = client.commands.get(client.aliases.get(command));

           } catch (error){
               console.error(error);
           }
        }
   })
   client.on("guildCreate", guild => {
    client.channels.cache.get(botlog).send(`** NEW GUILD **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
  });
  client.on("guildRemove", guild => {
    client.channels.cache.get(botlog).send(`** GUILD REMOVED **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
  });