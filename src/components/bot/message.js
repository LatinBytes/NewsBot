
const { client } = require('../Cliente')
const {getCommand} = require('../bot/commands')

let AsigmentChannel = () => {
  client.on('message', msg => {
    switch(msg.content){
      case '$news':{msg.reply(`Este es el canal <#${channel}>`);}
      break;
      default:break;
    }
    if(msg.content.startsWith('$news')){
      let chanel = getCommand(msg.content);
    }
  });   
}
module.exports = {
  AsigmentChannel
}