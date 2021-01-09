
const { client } = require('../Cliente')
const {getChannel} = require('../bot/commands')

let AsigmentChannel = () => {
  client.on('message', msg => {
    if(msg.content.startsWith('$news')){
    
    let channel = getChannel(msg.content);
    msg.reply(`Este es el canal <#${channel}>`);
    console.log(channel);
  }
  });   
}
module.exports = {
  AsigmentChannel
}