const { client } = require('../Cliente')
function getCommand(msg){


    let command = msg.split(' ');
    let key = command[0];
    let channel = command[1].slice(2,command[1].length -1);
    // console.log(command.join());
    console.log(command);
    console.log(channel);
    return channel;
}

module.exports  ={
    getCommand
}
