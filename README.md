# NewsBot

It is a discord bot to have the latest news from the world of technology
  
### Repositories
Right now we have support to these pages/apis (we want to add more):
  - github
  - gnews

## Bot commands
```
Hola! los comandos que entiendo son:
  **-r**: Esto es para los \`repositorios\`, especificar de que repocitorio quieres las noticias
  **-c**: Esto es para los \`canales\`, especificar en que canal quieres que publique las noticias
  **-t**: Esto es para los \`topicos\`, especificar que topicos quieres

**Ejemplos**:
  \`$news -c #nombre-del-canal #nombre-del-canal-2 -t javascript nodejs -r github gnews\`
    Lo que hace este comando, es que en el canal \`#nombre-del-canal\` y \`#nombre-del-canal-2\` recibiras 
    noticias relacionadas con \`javascript\` y \`nodejs\` provenientes de \`github\` y \`gnews\`
  
  \`$news -c -t -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con todos los topicos provenientes de todos los recursos

 \`$news -c -t javascript -r\`
    Lo que hace este comando, es que en el canal donde escribiste el comando recibiras 
    noticias relacionadas con \`javascript\` provenientes de todos los recursos

 \`$news -h\`
    Muestra este mensaje!

**Nota**: necesito recibir esas 3 vanderas **-r**, **-t**, **-c**
```
