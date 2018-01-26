


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
    "log" :console.log(),console.info(),console.error()'
    "middleware" :"Api Rest",
    "group":" console.groupKeyEnd()"
```