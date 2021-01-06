
const {client} = require('../Cliente')

let mensaje = (data) =>  {client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply(data)
    }
    console.log(`se publico "${msg.content}"`)
  })

  }
  module.exports={
    mensaje
}