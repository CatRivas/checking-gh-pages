let pcRandomNumber = 0;
let tryCounter = 0;
let endRange = 10;
let generatedNumbers = [];


function textToELement(element, text) {
    let tag = document.querySelector(element);
    tag.textContent = text;
}


function randomNumberGenerator() {
    let generatedNumber = Math.floor(Math.random() * endRange) + 1;
    if (generatedNumbers.length === endRange) {
        textToELement('p', 'All possible numbers have been generated. Reload the game.');

        //Ocultando los botones de 'Try' y 'New Game' y el textfield
        document.getElementById('user_input').style.display = 'none';
        document.getElementById('try_button').style.display = 'none';
        document.getElementById('new_game_button').style.display = 'none';
        
        //Muestro el boton 'Reload'
        document.getElementById('reload_game_button').style.display = 'block';
        
    } else {
        // si el numero ya existe en el array, generamos otro 
        if (generatedNumbers.includes(generatedNumber)) {
            return randomNumberGenerator();
        } else {
            //agrego cada numero en la lista de numeros generados y retorno el numero 
            generatedNumbers.push(generatedNumber);
            // console.log(generatedNumbers);
            return generatedNumber;
        }
    } 
}


function initialConditions() {
    textToELement('h1', 'GUESS THE F NUMBER');
    textToELement('p', `Put a number from 1-${endRange}`);
    pcRandomNumber = randomNumberGenerator(); 
    tryCounter = 1;

    // console.log(pcRandomNumber);
}


function compareNumbers() {
    let userInput = parseInt(document.getElementById('user_input').value);
    // console.log(userInput);
    // console.log(typeof(userInput)); //string
    // console.log(tryCounter);
    
    let message = tryCounter === 1 ? `You guessed it on the first try!` :  `You made it in ${tryCounter} tries.`;
    
    // validaciones de la entrada
    if (isNaN(userInput) || userInput < 1 || userInput > endRange) {
        textToELement('p', 'Invalid number, please enter a new one.');
        cleanField();
    } else {
        if (userInput === pcRandomNumber){
            textToELement('p', `Good done! ${message}`);
            document.getElementById('new_game_button').removeAttribute('disabled');
            
        } else { 
            if (userInput > pcRandomNumber){
                textToELement('p', 'Too high!');
            } else {
                textToELement('p', 'Too low!');
            }
            tryCounter ++;
            cleanField();
        }

    }
    
}


// funcion para limpiar el input del usuario
function cleanField() {
    // document.getElementById('user_input').value = '';
    // puedes usar .querySelector y poner como argumento un id pero debes poner un # al inicio, lit mejor usa .getElementById()
    document.querySelector('#user_input').value = '';
    
}

// creando el evento q ocurrira si das click en el boton New game
function newGame() {
    cleanField();
    initialConditions();
    document.getElementById('new_game_button').setAttribute('disabled', 'true');
}


// creo la funcion reloadGame() q limpiara la lista de numeros generados, limpiara los fields y reinicia las condiciones iniciales
function reloadGame() {
    generatedNumbers = [];
    cleanField();
    initialConditions();
    
    // Mostrar los botones 'Try' y 'New Game', ocultar el botón 'Reload'
    document.getElementById('try_button').style.display = 'block';
    document.getElementById('new_game_button').style.display = 'block';
    document.getElementById('user_input').style.display = 'block';
    document.getElementById('reload_game_button').style.display = 'none';

}

// Inicializar el juego
initialConditions();


