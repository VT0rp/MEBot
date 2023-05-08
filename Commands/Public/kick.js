const{
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
}= require("discord.js");
const { execute } = require("./ping");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("A la calle immigrante")
        .addUserOption((option) => option.setName(`target`).setDescription(`Usuario a kickear`).setRequired(true))
        .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del kickeo`)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const user = interaction.options.getUser(`target`);
        const guild = interaction;
        let razon = interaction.options.getString(`razon`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

        if(!razon) razon = "No hay razon";
        if(user.id === interaction.user.id) return interaction.reply({content: `No puedes kickearte a ti mismo`, ephemeral: true});
        if(user.id === client.user.id) return interaction.reply({content: `No puedes kickearme a mi`, ephemeral: true});
        if(!member.kickable) return interaction.reply({content: `No puedes kickearlo`, ephemeral: true});

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL || "https://media.discordapp.net/attachments/727172198242058380/1105228934414618794/sad_hyakkimaru.jpg"}` })
        .setTitle(`${user.tag} ha sido kickeado del servidor`)
        .setColor('#ff0000')
        .setTimestamp()
        .addFields({ name: `razon`, value: `${razon}`});

        await member.kick(razon).catch(console.error);

        interaction.reply({embeds: [embed], ephemeral: true});
    },
};