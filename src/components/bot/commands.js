const { client } = require('../Cliente')
function getChannel(msg){


    let command = msg.split(' ');
    let key = command[0];
    let channel = command[1].slice(2,command[1].length -1);
    
    return channel;
}

module.exports  ={
    getChannel
}
