const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
const FormData = require("form-data")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('openchat')
		.setDescription('answer your input')
		.addStringOption(option => option.setName('input').setDescription('anything what you want to say')),
	async execute(interaction) {
		const value = interaction.options.getString('input');
        
		if (value) {
            const formData = new FormData();
            formData.append('bot_id', "Mr.Bot")
            formData.append('text', value)
            formData.append('topic', "weekend")
            formData.append('agent', "blender.medium")
            await axios.post(
                'https://main-openchat-fpem123.endpoint.ainize.ai/send/S2lt',
                formData,
                {headers: formData.getHeaders()}
              )
              .then(function (response) {
                return interaction.reply(response.data.output);
              })
              .catch(function (error) {
                console.log(error);
              });
              

            return;
        }
		return interaction.reply('No option was provided!');
	},
};