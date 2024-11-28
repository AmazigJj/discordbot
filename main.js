import { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } from 'discord.js';
import { registerFont, createCanvas, loadImage } from 'canvas';
import 'dotenv/config';
// import { API } from 'cool-image-api-wrapper';
const CLIENT_ID = "1237883939151024180";
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

registerFont('fonts/Antonio/static/Antonio-Bold.ttf', { family: 'Antonio' })
// registerFont('fonts/Antonio/static/Antonio-Regular.ttf', { family: 'Antonio' })

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log('INTERACTION: '+interaction.commandName);
    if (interaction.commandName === 'ping') {
        // await interaction.reply('Pong!');
        await interaction.deferReply();
        // var image = await api.drake("TEST", "TESTSTST").catch((e) => {
        //     console.log(e);
        // });

        const canvas = createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
        
        ctx.font = 'bold 72px Antonio';
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';
        ctx.fillText('PING!', 100, 100);
        // ctx.fillText('Making memes manually', 700, 250, 500);
        // ctx.fillText('Making a bot to make memes', 700, 850, 500);
        const buffer = canvas.toBuffer();


        // console.log(image);
        const attachment = new AttachmentBuilder(buffer).setName("ping.png");
        interaction.editReply({files: [attachment]});
        // const embed = new EmbedBuilder().setTitle('testing');
        // interaction.editReply({embeds: [embed]});
        
    }
    if (interaction.commandName === 'drake') {
        await interaction.deferReply();

        const canvas = createCanvas(1200, 1200);
        const ctx = canvas.getContext('2d');
        await loadImage('Drake-Hotline-Bling.jpg').then((image) => {
            ctx.drawImage(image, 0, 0);
        });

        
        // ctx.fillText('Making memes manually', 700, 250, 400);
        // ctx.fillText('Making a bot to make memes', 700, 850, 400);
        
        const textA = interaction.options.getString('text_a');
        const textB = interaction.options.getString('text_b');



        ctx.font = 'bold 72px Antonio';
        ctx.textAlign = "center";
        ctx.textBaseline = 'middle';

        // ctx.fillText(textA, 900, 300, 400);
        drawText(ctx, textA, 900, 300, 0, 400);
        // ctx.fillText(textB, 900, 900, 400);
        drawText(ctx, textB, 900, 900, 0, 400);

        const buffer = canvas.toBuffer();

        const attachment = new AttachmentBuilder(buffer).setName("ping.png");
        interaction.editReply({files: [attachment]});
    }
});


function drawText(ctx, text, x, y, height, width) {
    let slash = false
    let has_space = false
    
    let cur_line = ""
    let lines = []

    let i = 0
    while (true) {
        if (i == text.length) {
            lines.push(cur_line)
            cur_line = ""
            break;
        }
        if (slash) {
            switch (text[i]){
                case 'n':
                    lines.push(cur_line)
                    cur_line = ""
                    i++
                    break;
            }
            slash = false;
            
        }
        else {
            switch (text[i]) {
                case '\\':
                    slash = true;
                    i++
                    break;
                case ' ':
                    // test length of line
                default:
                    console.log(text[i])
                    cur_line+=text[i]
                    i++
                    break
            }
        }
    }
    
    // let lines = text.split('\\n');
    console.log(lines);
    let start_y = y - ( lines.length * 36 );

    for (let i in lines) {
        let line = lines[i];
        ctx.fillText(line, x, start_y+(i*72), width);
    }
}

client.login(TOKEN);
