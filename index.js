
const { Client, GatewayIntentBits, Partials } = require('discord.js');
var path = require('path');
const {
    token
} = require(path.join(process.cwd(), './config.json'));
const { Message } = require('discord.js');
const convertToASCII = require('ascii-converter').default;
const zeroPad = (num, places) => String(num).padStart(places, '0');
const MAXFRAME = 6572

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel],

    disableMentions: 'everyone',
});
client.on('ready', () => {
    console.log('discord.js client ready');
});

client.on('messageCreate', async message => {
    console.log('in Event');
    if (message.content.startsWith('++playG')) {
        BA(message, "░▒▓▓█");
        return;
    }
    if (message.content.startsWith('++playD')) {
        BA(message, "⠄⠃⠆⠖⠇⠶⠏⡶⠟⣩⠿⣪⣫⣾⣿⠏⠟⠿");
        return;
    }
});

async function BA(args, pixels) {

    args.reply('Testing').then(
        /**
         * 
         * @param {Message} resultMessage 
         */
        async resultMessage => {
            var msg = resultMessage;

            try {
                for (let index = 1; index < MAXFRAME; index += 6) {
                    await new Promise((resolve, reject) => {
                        var frameNum = zeroPad(index, 4);
                        var filePath = "./frames/BadApple" +
                            frameNum + ".png";
                        var content = frameNum + "Frame\n";
                        convertToASCII(
                            filePath.toString(),
                            {
                                width: 24,
                                height:13,
                                grayScale: pixels
                            }
                        ).then(
                            (converted) => {
                                content += converted;
                                //console.log(err);
                                msg.edit(content)
                                    .then(() => { resolve(content); })
                                    .catch((err) => { reject(err) })

                            }
                        );
                    }).catch((err) => { throw err })


                }
            } catch (error) { console.log(error); }

        })


}

client.login(token);