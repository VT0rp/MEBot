const { ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te respondere con Pong"),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction){
        if(interaction.user.id !== "727171748294033420"){
            interaction.reply({content: "Quien te conoce random", ephemeral: true});
        }else{
            interaction.reply({content: "pong", ephemeral: true});
        }
    },
};