// TGS-Bot
// Version: 0.9 PRE-ALPHA / PRE-REALEASE ibot.sapce
// Discord Code: 

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
db.createWebview("Wimpykid7", process.env.PORT);
const { get } = require("snekfetch"); 
const superagent = require("superagent");
const weather = require('weather-js');

var randomColor = Math.floor(Math.random() * 16777215).toString(16);
const autoroles = new db.table('Autoroles');
const http = require('http');
const express = require('express');
const app = express();
const botstats = new db.table('BotStats');
app.listen(8080);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 300000);






client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! There are no apparent major bugs.`);
    client.user.setStatus("online");
    let users = client.users.size 
    setInterval(function(){  client.user.setPresence({ game: { name: `ibot.space | ${users} users!`, url: 'https://twitch.tv/discordapp', type: 1 } });; }, 10000);
    setInterval(function(){  client.user.setPresence({ game: { name: `ibot.space | ${client.guilds.size} guilds!`, url: 'https://twitch.tv/discordapp', type: 1 } });; }, 10000);
 
});

client.on('ready', () => {
    setInterval(() => {
    let users = client.users.size
    superagent
      .post('https://ibotonlne.firebaseio.com/.json')
      .send({ servers: users, users: users })
    }, 500);
});

client.on('guildMemberRemove', member => db.set(`roles_${member.id}`, member._roles));
client.on('guildMemberAdd', async member => {
  const autoroles = new db.table('Autoroles');
  let guildid = await autoroles.fetch(`Autorole_${member.guild.id}`, { target: '.guildid' })
  let rolea = await autoroles.fetch(`Autorole_${member.guild.id}`, { target: '.role' })
  if(member.guild.id === guildid) { //autorole
  let role = member.guild.roles.get(rolea);
  await (member.addRole(rolea))
	}
});

client.on('messageDelete', async (message) => {
    const logs = message.guild.channels.find('name', 'logs');
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        await message.guild.createChannel('logs', 'text');
    }
    if (!logs) {
        return console.log('The logs channel does not exist and cannot be created')
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user;
    if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    const logembed = new Discord.RichEmbed()
        //.setTitle('Message Deleted')
        .setAuthor(user.tag, message.author.displayAvatarURL)
        .addField(`**Message sent by ${message.author.username} deleted in ${message.channel.name}**\n\n`, message.content)
        .setColor(message.guild.member(client.user).displayHexColor)
        .setFooter(`<#${message.channel.id}>`)
        .setTimestamp()
    //console.log(entry)
    logs.send(logembed);
})
client.on('message', async message => {
  if (message.author.bot) return;
  let status = new db.table('AFKs');

let mentioned = message.mentions.members.first();
if (mentioned) { 
let mstatus = await status.fetch(mentioned.id)
if (!mstatus) { return; }
if(status) {
 const embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setTitle(mentioned.user.username + ' is AFK!')
   .setDescription(mstatus)
   message.channel.send(embed)

  } else if(!status) {
  return;
  }

}

});



client.on("guildCreate", async guild => {
    let name = guild.name || '**NOT FOUND**'
    let owner = guild.owner.user || '**NOT FOUND**'
    const textChannels = guild.channels.filter((channel) => (channel.type === 'text'));
    const randomchannelid = textChannels.random().id;
    //let invite = client.channels.get(randomchannelid).createInvite({
    //    maxAge: 0
    //  });
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);

    var joinEmbed = new Discord.RichEmbed()
    .setTitle("New Guild")
    .setColor(randomColor)
    .setFooter("iBot • Guild Alert")
    .setTimestamp()
    .setThumbnail('https://cdn.discordapp.com/attachments/379006942875746306/451309167127560193/circle.png')
    .setDescription("iBot has joined a new guild called, **" + name + "**! It is owned by **" + owner + "**.")
    .addBlankField()
    //.addField("Random Invite:", invite.code)
    .addField(`Random Channel ID:`, `${randomchannelid}`)
  
    const welcomechannel = client.channels.get("449182354507038720")
    welcomechannel.send(joinEmbed)
    .then(() => console.log(`Sent welcome message!`))
    .catch(console.error);
});
             


             


client.on('message', async message => {
let balance = await db.fetch(`balance_${message.author.id}`)
if (balance === null) await db.set(`balance_${message.author.id}`, 0);
    let sender = message.author;
    const ayy = client.emojis.find("name", "tickNo");
    if (sender.bot) return;



   



   
   var guildid = message.guild.id
   let prefix = await db.fetch(`guildPrefix_${guildid}`)
   if (prefix === null) prefix = "!"; 
  let prefix1 = "prefix";
  if (message.content.startsWith(prefix1)) message.channel.send("Hey there, the prefix is " + prefix + ", to find out about my commands, say " + prefix + "cmds");

        let msg = message.content.toLowerCase();
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;

        try {
            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(Discord, client, message, args);

        } catch (e) {

            console.log(e);

        }

    
})
const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyBxy_f2i6Pk0euSzTYnniAKSvaOLaaH94Y");
const queue = new Map();
client.on('message', async msg => {
     var guildid = msg.guild.id
   let prefix = await db.fetch(`guildPrefix_${guildid}`)
   if (prefix === null) prefix = "!";
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(prefix)) return undefined;
  let balance = await db.fetch(`balance_${msg.author.id}`)
  if (balance === null) await db.set(`balance_${msg.author.id}`, 0);
	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to play music');
    if(!args[1]) return msg.channel.send(':no_entry: Please input a song name that you wish to be played');
    const permissions = voiceChannel.permissionsFor(msg.guild.me);
    if (!permissions.has('CONNECT')) {
        return msg.channel.send('I cannot connect to your voice channel, make sure I have the connect permission');
    }
    if (!permissions.has('SPEAK')) {
        return msg.channel.send('I cannot speak in this voice channel, make sure I have the speak permission');
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const playlist = await youtube.getPlaylist(url);
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id);
            await handleVideo(video2, msg, voiceChannel, true);
        }
        return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                var video = await youtube.getVideoByID(videos[0].id)

            } catch (err) {
                console.error(err);
                return msg.channel.send('I could not obtain any search results.');
            }
        }
        return handleVideo(video, msg, voiceChannel);
    }
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing');
		serverQueue.connection.dispatcher.end();
    return msg.channel.send(':white_check_mark: Skipped a song for you!');
	} else if (command === 'disconnect' | command === 'dc') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();
		return msg.channel.send(':white_check_mark: Disconnected from the voice channel!');
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`); 
	} else if (command === 'pause' | command === 'p') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume' | command === 'r') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send("No song is paused so I can't resume anything");
	}
	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Started playing **${song.title}**`);
}
/*client.on("message", async (message, guild) => {
let member = message.author;
let pass = await db.fetch(`ServerPass_451438570410999818`, { target: '.pass' });
if(pass === 'true') console.log("password not enabled on this guild")
else {
message.author.send("Password Protection Is Enabled On " + guild + ", please enter the password.")
let word = await db.fetch(`ServerPass_451438570410999818`, { target: '.word' });
let role = await db.fetch(`ServerPass_451438570410999818`, { target: '.role' });
let modRole = message.guild.roles.find("name", role);
const collector = new Discord.MessageCollector(member, { time: 60000 });
member.send("You have 60 seconds to enter the password.");
collector.on('collect', async message => {
    if (message.content == word) {
        member.send("Correct password entered, you will now be roled in the server!")
        await member.addRole(modRole);
        member.send("You've succsesfully been roled, thanks for using iBot Password Protection")

    }
})
}
});

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  let channel = client.channels.get("449182354507038720")
  let embed = new Discord.RichEmbed()
  .setTitle("New Guild")
  .setColor(randomColor)
  .setFooter("iBot | New Guild")
  .setTimestamp()
  .setThumbnail('https://cdn.discordapp.com/attachments/379006942875746306/451309167127560193/circle.png')
  .setDescription("iBot has joined a new guild called, " + guild.name + "! It is owned by " + guild.owner.username + ".")
channel.send(embed)
})*/
          
client.login(process.env.BOT_TOKEN);
