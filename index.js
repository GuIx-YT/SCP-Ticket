const { SlashCommandBuilder } = require("@discordjs/builders");

const Discord = require("discord.js");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

var nbTicket = 0;

Client.login(process.env.TOKEN_SCP);

Client.on("ready", () =>{
    console.log("indexe en cour...");
    console.log("SCP BREACH RP");

    function randomStatus() {
        let status = ["TICKET"]
        let rstatus = Math.floor(Math.random() * status.length);

        Client.user.setActivity(status[rstatus], {type: "WATCHING"});
    }; setImmediate(randomStatus, 2000)

    // var row = new Discord.MessageActionRow()
    //     .addComponents(new Discord.MessageButton()
    //         .setCustomId("open-ticket")
    //         .setLabel("Ouvrir un Ticket")
    //         .setStyle("PRIMARY")
    //     );

    // const embed = new Discord.MessageEmbed()
    //     .setAuthor("SCP Breach RP")
    //     .setColor("GREY")
    //     .setTitle("**Ticket**")
    //     .setDescription("Vous pouvez faire un Ticket en appuyant sur le bouton ci-dessous")
    
    // Client.channels.cache.get("991810648881254481").send({embeds: [embed], components: [row]});

});

Client.on("interactionCreate", interaction => {
    if(interaction.isButton()){
        if(interaction.customId === "open-ticket"){
            nbTicket++;

            interaction.guild.channels.create("ticket-" + nbTicket, {
                parent: "996794865780281364",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [Discord.Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                        id: interaction.user.id,
                        allow: [Discord.Permissions.FLAGS.VIEW_CHANNEL]
                    }
                ]
            }).then(channel => {
                var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("close-ticket")
                        .setLabel("Fermer le Ticket")
                        .setStyle("DANGER")                    
                    );

                const embed = new Discord.MessageEmbed()
                    .setAuthor("SCP Breach RP")
                    .setColor("GREY")
                    .setTitle("**Ticket**")
                    .setDescription("Voici votre Ticket <@" + interaction.user.id + "> Vous-êtes en contacte avec les membres du Staff")
                
                channel.send({embeds: [embed], components: [row]});
            });
        }
        else if(interaction.customId === "close-ticket"){
            interaction.channel.setParent("996794754899644456");

            var row = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("delete-ticket")
                        .setLabel("Supprimer le Ticket")
                        .setStyle("DANGER")
                    );
            const embed = new Discord.MessageEmbed()
                .setAuthor("SCP Breach RP")
                .setColor("GREY")
                .setTitle("**Ticket**")
                .setDescription("Le Ticket à été Archivé")
            
            interaction.message.delete();

            interaction.channel.send({embeds: [embed], components: [row]});
        }
        else if(interaction.customId === "delete-ticket"){
            interaction.channel.delete();

            interaction.reply({content: "Ticket correctement supprimé", ephemeral: true});
        }
    }
});
