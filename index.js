const tmi = require('tmi.js');

const opts = {
options: {
    debug: true,
},
identity: {
    username: "botname", //
    password: "oauth:" // https://twitchapps.com/tmi/
},

channels: [ 
    '#channel',
    '#channel2',
    '#channel3',
    '#channel4',
    '#channel5'
]
};

const client = new tmi.client(opts);
client.connect();

const ban = [ 'KappaPride', 'cmonBruh' ];

const timeout = [ '123', '456' ];

client.on('connected', onConnectedHandler);
function onConnectedHandler(addr, port) {
    console.log(`${addr}:${port}`);
    client.action('#channel', `&*#$^&*!#&%*Y#!`);
}

client.on('message', checkChat);
function checkChat(channel, username, message) {
	let shouldSendMessage = false;
		message = message.toLowerCase();
	shouldSendMessage = ban.some(blockedWord => message.includes(blockedWord.toLowerCase()));
	if (shouldSendMessage) {
	client.ban(channel, username.username)
		.then((data) => {

		}).catch((err) => {

		});
		client.say(channel, ``);
	}
}

client.on('message', checkChat5);
function checkChat5(channel, username, message) {
	let shouldSendMessage = false;
		message = message.toLowerCase();
	shouldSendMessage = timeout.some(blockedWord => message.includes(blockedWord.toLowerCase()));
	if (shouldSendMessage) {
	client.timeout(channel, username.username, 10 )
		.then((data) => {

		}).catch((err) => {

		});
		client.say(channel, ``);
	}
}

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;
	
	const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();
	
	if(command === 'echo' && (tags['user-id'] === 'twitch id')) {	
		client.say(channel, `@${tags.username},  ${args.join(' ')}`);
    }	
});

client.on('message', (channel, tags, message, self) => {
    if(self) return;
    if(message.toLowerCase() === '!vanish') {	
        client.say(channel, `/timeout ${tags.username} 1`);	
    }
});

client.on('message', (channel, tags, message, self) => {
    if(self) return;
    if(message.toLowerCase() === '!ping') {	
        try {
            if(tags.badges.broadcaster==1){
                client.say(channel, `@${tags.username}, Pong 🏓`);	
            }
        
            if(tags.badges.moderator==1){
                client.say(channel, `@${tags.username}, Pong 🏓`);	
            }
        }
        catch(err){
			client.say(channel, `@${tags.username}, err`);
        }
    }
});

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!github') {
		client.say(channel, ` @${tags.username}, https://github.com/fxhxyz4`);
    }
});

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!twitch') {
		client.say(channel, ` @${tags.username}, https://twitch.tv/fxhxyz`);
    }
});

function rollDice() {
	const sides = 10000;
	return Math.floor(Math.random() * sides) + 1;
}

client.on('message', (channel, tags, message, self) => {
	if(self) return;
	const num = rollDice();
	if(message.toLowerCase() === '!poof') {
		client.say(channel, `/timeout ${tags.username} ${num}`);
    }
});


