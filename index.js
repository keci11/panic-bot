const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is online!'));
app.listen(process.env.PORT || 3000, () => console.log('Webserver gestart!'));

const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const FOTO_URL = "https://i.imgur.com/R8Jyehc.png"; 

client.once('ready', () => {
    console.log(`[PTF Systeem] De bot is succesvol opgestart als ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.content === '!panic-setup') {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle('🚨 EMERGENCY SYSTEM')
            .setColor(0xFF0000)
            .setDescription(
                `**Emergency Only:** This button is strictly for emergencies (raids, severe rule violations, or urgent security threats).\n\n` +
                `**No Trolling:** Using the panic button for testing purposes, jokes, or unnecessary pings will result in a temporary or permanent ban from the system.\n\n` +
                `**Accountability:** Every report is logged with the user's ID. "Finish" button actions are also monitored to ensure the system is not abused.\n\n` +
                `**Think Before You Click:** Ask yourself: "Does everyone on the server really need to be alerted for this?"\n\n` +
                `⚠️ **IMPORTANT:** Misuse of this button for jokes or testing will result in a BAN. Only use for actual emergencies!`
            )
            .setImage(FOTO_URL) // Dit zorgt ervoor dat de foto getoond wordt
            .setFooter({ text: 'PTF Panic Systeem • Powered by LenoyMaster' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('panic_button')
                    .setLabel('🚨 PANIC')
                    .setStyle(ButtonStyle.Danger)
            );

        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'panic_button') {
        await interaction.channel.send({ content: `⚠️ **PANIC KNOP INGEDRUKT DOOR <@${interaction.user.id}>!** @everyone` });
        await interaction.reply({ content: 'De noodknop is geactiveerd en iedereen is getagd!', ephemeral: true });
    }
});

client.login('MTUxMjk0NjE5NjMzMzg1ODg3Ng.G_cQwB.VinSX7NnA5fPVGj9sr9SRELZXrRFu5rVz9TLy8');
