var word; //Texto ingresado por el usuario
var $element; //Elemento HTML
var $char; //Caracter evaluado en el momento
var cont; //Contador
var correcta = true; //Variable booleana para evaluar si el texto es correcto
const END = "\n"; //Fin de linea
const END_V = END.charCodeAt(0); //Constante para el fin de linea
const ENTER = 13; //Constante del valor de la tecla ENTER
const INPUTTEXT_ID = "texto"; //Id del Input Text
//Ids de lista 
const IDENTIFICADORES_LID = "identificadores"; 
const NUMEROS_LID = "numeros"; 
const SIMBOLOS_LID = "simbolos";
const ERRORES_LID = "errores";

//Funcion para ingresar texto a una lista
function ingresarLista(nombre, _word,_color) {
    $element = document.getElementById(nombre);
    $element.style.visibility = "visible";
            $element.innerHTML = $element.innerHTML + "<li>" + _word + "</li>";
}

//Ejecutar al presionar ENTER


/*Evaluar el primer caracter de la cadena, luego
enviar toda la cadena para ser evaluada */
//EL VALOR 10 ES VÁLIDO

$element = document.getElementById(INPUTTEXT_ID);
$element.addEventListener("keyup", function(event) {
    if (event.keyCode === ENTER) {
        document.getElementById("evaluar").click();
    }
});

function evaluar(){
    word = document.getElementById(INPUTTEXT_ID).value + END;
    $char = word.charCodeAt(0);
    correcta = true;
    var type = 0;
    console.log(word);
    console.log($char);
    if ($char == END_V) {
        type = 5;
    } else if (numeroId($char)) {
       /*  if (numero(word)) {
            ingresarLista("correctas",word);
       } else {
        ingresarLista(ERRORES_LID,word);
       } */
       type = 1;
     } else if (letra($char)) {
       /* if (identificador(word)) {
         ingresarLista("correctas",word);
       } else {
        ingresarLista(ERRORES_LID,word);
       } */
       type = 0;
     } else if (simbolo($char)) {
        type = 2;
    } else {
        type = 5;
    }
    if (identificar(word, type)) {
//        ingresarLista("correctas", word, );
        switch (type) {
            case 0:
                ingresarLista(IDENTIFICADORES_LID, word);
                break;
            case 1:
                ingresarLista(NUMEROS_LID, word);
                break;
                case 2:
                        ingresarLista(SIMBOLOS_LID, word)
                        break;
            default:
                break;
        }
    } else {
        ingresarLista(ERRORES_LID, word);
    }
}


/* Recibe la palabra original + new line
  Evalua cada letra de la palabra (Utilizando letra())
  Podria ser recursiva (Perdiendo reutilizacion)
 */

 // Funcion identificador recursiva:
 /*
 function identificador(_word) {
     $char = _word.charCodeAt(cont);
    if ((_char>=97 && _char<=122) ||
        (_char>=65 && _char<=90) ||
        (_char>=48 && _char<=57)) {
        return identificador(_word);
    } else if _(char == END_V){
        return true;
    } else {
        return false;
    }
    cont++;
 }
 */


//Funcion que evalua de que tipo podria ser el texto ingresado 
function identificar(_word, type) {
    cont =0;
    while ($char != END_V) {
    $char = _word.charCodeAt(cont);
    cont++;
        switch (type) {
            case 0:
                correcta = letra($char) && correcta;
                break;
            case 1: 
                correcta = numeroId($char) && correcta;
                break;
            case 2:
                correcta = simbolo($char) && correcta;
                break;
            default:
                correcta = false;
                break;
        }
   }
   clear(INPUTTEXT_ID);
   return correcta;
}

//Funcion que vacia un elemento de texto
function clear(_name) {
    $element = document.getElementById(_name);
    $element.value = "";
}

//Las siguientes funciones retornan un valor booleano y reciben un caracter

/* Funcion que evalua si el valor ASCII del  caracter enviado 
    corresponde a una letra */
function letra(_char) {
    if ((_char>=97 && _char<=122) || (_char>=65 && _char<=90) || _char == END_V) {
        return true;
    } else {
        return numeroId(_char);
    }
}

/* Funcion que evalua si el valor ASCII del  caracter enviado 
    corresponde a un numero*/
function numeroId(_char){
    if ((_char>=48 && _char<=57) || _char == END_V) {
        return true;
    } else {
        return false;
    }
}

/* Funcion que evalua si el valor ASCII del  caracter enviado 
    corresponde a un simbolo */
function simbolo(_char) {
    if ((_char>=33 && _char<=47)  ||
        (_char>=58 && _char<=64)  ||
        (_char>=91 && _char<=96)  ||
        (_char>=123 && _char<=126) ||
        (_char>=160 && _char<=170) || _char == END_V) {
        return true;
    } else {
        return false;
    }
}
