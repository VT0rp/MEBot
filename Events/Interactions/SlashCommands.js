const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client){
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        //Si el comando no está en la lista, devuelve un mensaje
        if(!command)
        return interaction.reply({
            content: "Este comando está desactualizado.",
            ephermal: true,
        });
        //Si alguien ejecuta el comando y no es el desarrollador del bot le devuelve un mensaje
        if(command.developer && interaction.user.id !== "727171748294033420")
        return interaction.reply({
            content: "Quien te conoce random",
            ephemeral: true,
        });

        command.execute(interaction, client);
    },
}