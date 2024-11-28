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
    var lines = text.split('\\n');
    console.log(lines);
    var start_y = y - ( lines.length * 36 );

    var new_text = lines.join('\n');
    console.log(new_text);
    ctx.fillText(new_text, x, y, width);

    // for (var i in lines) {
    //     var line = lines[i];
    //     console.log(line);
    //     ctx.fillText(line, x, start_y+(i*72), width);
    // }
}

client.login(TOKEN);
