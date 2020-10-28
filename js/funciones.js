var contador = 0;
var tam = 0;
function iniciar(){
    contador = 0;
    cargarDatos();
}

function cargarDatos(){
    var personaje = document.getElementById("bPersonaje").value;
    var request = new XMLHttpRequest();

    try {
        request.open('GET',"https://rickandmortyapi.com/api/character/?name="+personaje);
        request.send();
    } catch (error) {
        alert("No se encuentra el personaje: " + personaje)
    }
    
    request.onload = function () {
        try {
            var datos = JSON.parse(this.response);
            tam = datos["results"].length;
            var detalles = "";
            var fin = contador + 5;
            for(var i=contador; i<fin; i++){
                detalles += "<tr>" +
                "<td>" + datos["results"][i].name + "</td>" +
                "<td>" + datos["results"][i].status + "</td>" +
                "<td>" + datos["results"][i].gender + "</td>" +
                "<td>" + datos["results"][i].species + "</td>" +
                "<td>" + datos["results"][i].origin.name + "</td>" +
                "<td>" + datos["results"][i].location.name + "</td>" +
                "<td><img src=" + datos["results"][i].image + "></td>" +
                "</tr>"; 

                if(i == tam-1){
                    i = fin;
                }           
            }
        
            document.getElementById("tabla").innerHTML = detalles
        } catch (error) {
            alert("No se encuentra el personaje: " + personaje)
        }
        
    }
}

function cargarAntPag(){
    contador -= 5;
    if(contador >= 0){
        cargarDatos();
    }else{
        contador += 5;
    }
}

function cargarSigPag(){
    contador += 5;
    if(contador < tam){
        cargarDatos();
    }else{
        contador -= 5;
    }
}