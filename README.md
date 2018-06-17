


### Ejemplos

Los ejemplos del uso de la consola y las pruebas de los q puede devolver estan en las rutas por el metodo GET
```
/console/log-single     =>  log de un parametro simple
/console/log-object     =>  log de un objecto
/console/log-array      =>  log de un array
/console/log-multiple   =>  log de varios parametros en un solo console
/console/error          =>  log emite el error ocurrido en el proceso
/console/group          =>  log group ,emitira un conjunto de logs hasta q se concrete determinado proceso en este caso un factorial 
```
Nota .- la ruta console/group ....  puede recibir un parametro console/group?number=3 , Este para poder sacar el factorial 
del parametro dado si no se lo coloca por defecto se toma el valor de 8,
## Metodos
### Servidor

En este momento estan integrados los metodos 
    console.log();
    console.info();
estos metodos tienen una comunicacion con el socket y tienen la estructura de 

```
    {
        "id":"", // id del console
        "line":"userDirectory/path" // linea de codigo desde donde se manda el console en el servidor,
        "type" : "log" // tipo de console del servidor ,'log'> console.log() ,'info'>console.info(), 'error'>console.error()
        "data" : "..." // pull de datos q se visualizaran en el console    
    }
```

console.groupKey(key,data...);
```
@Params({
    key:'index'// Codigo del group,
    data... : ''// Datos a mostrar,
})
```
Estos datos se acumulan hasta que se ejecute console.groupKeyEnd;

console.groupKeyEnd(key,data...);
```
@Params({
    key:'index'// Codigo del group,
    data... : ''// Datos a mostrar,
})
```
Cuando se ejecuta el metodo ,se manda todos los agrupados con el 'key'

El metodo groupKeyEnd se comunica con el socket y manda los datos con la siguiente estructura

```
    {
        "id":"", // id del console
        "line":"userDirectory/path" // linea de codigo desde donde se manda el console en el servidor,
        "type" : "group" // tipo de console del servidor ,'group'> console.groupKey() ,
        "group": "index" // Codigo de grupo del console
        "data" : [] // todos los console.groups anidados con el mismo group,
    }
```
### Cliente

El cliente se conecta en el puerto 8888
y se conecta en los canales,
```
    "log" : "console.log(),console.info(),console.error()"
    "middleware" : "Api Rest",
    "group" : "console.groupKeyEnd()"

```

### Interacción

Para una mejor interacción con el cliente se proporciona el servicio de paginación

El cliente puede mandar los datos al canal:
```
    "list":{
        "limit":"Cantidad de datos por página",
        "page":"Página actual",
        "type":"tipo de log que se enviaran (default= 'all')"
    }
```

Ejemplo

```
    socket.emit("list",{
        limit:3,
        page:0,
        type:"all" // podria ser tambien - "error", "log", "group"
    })
```
El resultado de esta consulta se enviara a un canal de escucha llamado "list-pagination"

```
    socket.on("list-pagination",(response)=>{

    });
```

Donde la respuesta tiene un como resultado: 

```
{
    "limit":"Cantidad de datos por página",
    "page":"Página actual",
    "results":"Resultado que se solicito",
    "total_logs":"Cantidad de logs",
    "total_pages":"Cantidad de paginas que se podrian consumir"
}
```
## NUEVO

Se implemento un visualizador del archivo de donde se esta haciendo un console  

Cuando se realiza un click en la imagen de Codigo en la parte izquierda de la lista de Logs (</>), este deveria de emitir una peticion al servidorr en el canal "file" enviandole como parametro linea de codigo del log, como se muestra en el siguiente código.

```
socket.emit('file'{
    line:'/Users/iZel/www/workChygui/serveBrow/routes/index.js:26:11'
    })
```

Al hacer esto el servidor enviara una repuesta en el canal de eschucha llamado "view-file".

```
socket.on('view-file',function (data) {           
            let content = document.getElementById('content');
            content.innerHTML=data.codeHtml                                       
        });
```
Retornando 1 argumento ,que contiene 2 parametros
```
    "codeHtml":""    // Este es una pequeña tabla en codigo HTML para q se inserte donde se desee,

    "codeJson":[]   // Este sera un array todos los datos con los q se construyo la tabla del anterior parametro.
```

El parametro "codeJson" nos sirve para poder hacer en el front un tabla mas personalizada con los datos de el numero de linea ,texto de la linea y si es la linea que buscamos, este parametro que es un array esta compuesto de objetos con este formato :
```
{
    "numLine":21, // numero de linea
    "textLine":"adsadsasdasd", // texto de la linea
    "isThisLine":true || false // si es la linea que manda el console
}
```
Actualmente manda un rango de 3, eso quiere decir q mandara 3 lineas que estan arriba del numero de linea que solicitamos y 3 lineas posteriores a la linea que solicitamos

Para ver el ejemplo funcionando, heche un vistaso  a la archivo index.ejs de la carpeta views



