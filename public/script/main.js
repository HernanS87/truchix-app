
// Instanciación para el slider
let slider = document.querySelector('#slider');
let btnLeft = document.querySelector('#btn-left');
let btnRight = document.querySelector('#btn-right');
let closeSlider = document.querySelector('#closeSlider')
let closeSliderViejo = document.querySelector('#closeSliderViejo')


// Instanciación de objetos
let sections = document.querySelectorAll('section');
let form = document.getElementById('form');
let firstScreen = document.getElementById('firstScreen');
let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');
let partidasViejas = document.querySelector('#partidasViejas');
let secondScreen = document.getElementById('secondScreen');
let containerSlider = document.querySelector('.container-slider');
let fourthScreen = document.querySelector('#fourthScreen');
let seeResult = document.querySelector('#seeResult');
let tryAgain = document.querySelector('#tryAgain');

let fifthScreen = document.querySelector('#fifthScreen');
let playersResult = document.querySelector('#playersResult');
let match = document.querySelector('#match');

let save = document.querySelector('#save');
let exit = document.querySelector('#exit'); 
// Cartas seleccionadas al azar
let cartas = []; 
// partidas anteriores
let partidas = [];

let nameP1 = '';
let nameP2 = '';


// FUNCIONES PARA LOS BOTONES DEL SLIDER

function next() {
    let sliderSectionFirst = document.querySelector('.slider__section:first-child');
    slider.style.marginLeft = '-200%';
    slider.style.transition = 'all 0.5s';
    setTimeout(function() {
        slider.style.transition = 'none';
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = '-100%';
    }, 500);
}

function prev() {
    let sliderSectionLast = document.querySelector('.slider__section:last-child');
    slider.style.marginLeft = '0';
    slider.style.transition = 'all 0.5s';
    setTimeout(function() {
        slider.style.transition = 'none';
        slider.insertAdjacentElement("afterbegin", sliderSectionLast);
        slider.style.marginLeft = '-100%';
    }, 500);
}


// FUNCION PARA MOSTRAR PANTALLAS

const showPages = (page) => {
    sections.forEach((section) => {
        if (section.id === page) {
            section.classList.remove('dnone')
        }else {
            section.classList.add('dnone')
        }
    })
}


// Funcion para resetear

const resetear = () => {
    slider.innerHTML = '';
    cartas = [];
}


// Funcion que carga la info al slider

function infoSliders(name1, name2, num) {

    if (num != undefined) {
        nameP1 = name1;
        nameP2 = name2;
        cartas = partidas[num]
    }

    for(let i = 0; i < 6; i++) {
        let h1 = document.createElement('h1');
        if (i < 3){
            h1.textContent = `Carta ${i+1}/3 de ${nameP1}`;
        } else {
            h1.textContent = `Carta ${i-2}/3 de ${nameP2}`;
        }
        let img = document.createElement('img');
        img.setAttribute('src', cartas[i].image)
        // let h2 = document.createElement('h2');
        // h2.innerHTML = cartas[i].tittle;
        let div = document.createElement('div');
        div.className = 'slider__section';
        div.appendChild(h1);
        div.appendChild(img);
        // div.appendChild(h2);
        slider.appendChild(div);
    }
    let sliderSectionLast = document.querySelector('.slider__section:last-child');
    slider.insertAdjacentElement("afterbegin",sliderSectionLast);
}


// Funcion que carga la info al slider de partidas anteriores

function infoSliders2(name1, name2, num) {

    infoSliders(name1, name2, num);

    results();
// si queres ver el slider cambia el valor de showPages a thirdScreen y borra la linea del style y descomentá los style de los botones
    showPages('fifthScreen');
    save.style.display = 'none';
    // closeSlider.style.display = 'none';
    // closeSliderViejo.style.display = 'block';

}


// Obtiene las cartas al azar

function repartir(){
    let indiceAzar = []
    while (indiceAzar.length < 6) {
        let num = Math.floor(Math.random() * mazo.length);
        let rep = false;
        for(x of indiceAzar){
            if (x == num) {
                rep = true;
            }
        } 
        if (!rep){
            indiceAzar.push(num);
            cartas.push(mazo[num]);
        }
    }
}


// FORMULARIO

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    nameP1 = player1.value; 
    nameP2 = player2.value; 
    
    repartir();

    infoSliders();

    showPages('secondScreen');

    setTimeout(function(){
        showPages('thirdScreen');
    }, 3000);
    
    form.reset();
    console.log(cartas);
})


// FUNCION QUE GUARDA LAS PARTIDAS

let cont = 0;
function guardarInfo() {
    
    partidas.push(cartas);

    let leyenda = `<div>
    <span>Partida de ${nameP1} y ${nameP2}</span>
    <button onclick="infoSliders2('${nameP1}', '${nameP2}', ${cont})">Ver</button>
</div>`;

    partidasViejas.innerHTML += leyenda;
    cont++

    resetear();
    
    showPages('firstScreen');
    partidasViejas.classList.remove('dnone');
}


// FUNCION QUE CALCULA EL MATCH

function matchResult() {
    let pointsP1 = 0;
    let pointsP2 = 0;
    let resp = '';
    for (var i = 0; i < 3; i++) {
        if (cartas[i].score > cartas[i+3].score) {
            pointsP1++
        } else if (cartas[i].score < cartas[i+3].score) {
            pointsP2++
        } else {
            console.log(`las cartas ${cartas[i].tittle} y ${cartas[i+3].tittle} tienen el mismo score`)
        }
    }
    if (cartas[0].score == cartas[3].score && cartas[1].score > cartas[4].score) {
        pointsP1 += 10;
    }
    if (cartas[0].score > cartas[3].score && cartas[1].score == cartas[4].score) {
        pointsP1 += 10;
    }
    if (cartas[0].score == cartas[3].score && cartas[1].score < cartas[4].score) {
        pointsP2 += 10;
    }
    if (cartas[0].score < cartas[3].score && cartas[1].score == cartas[4].score) {
        pointsP2 += 10;
    }
    if (pointsP1 > pointsP2) {
        resp = `Ganó ${nameP1}`
    } else if (pointsP1 < pointsP2) {
        resp = `Ganó ${nameP2}`
    } else {
        resp = `Es un EMPATE`
    }
    return resp
}

// FUNCION QUE CARGA LA QUINTA PANTALLA CON LOS RESULTADOS

function results() {
    let info = `
    <h2>${nameP1}</h2>
    <img src="${cartas[0].image}">
    <img src="${cartas[1].image}">
    <img src="${cartas[2].image}">
    <h2>${nameP2}</h2>
    <img src="${cartas[3].image}">
    <img src="${cartas[4].image}">
    <img src="${cartas[5].image}">`;

    let answer = matchResult();

    match.innerHTML = answer;

    playersResult.innerHTML = info;

    showPages('fifthScreen');
} 


// BOTONES DEL SLIDER

btnRight.addEventListener('click', next);
btnLeft.addEventListener('click', prev);
closeSlider.addEventListener('click', () =>{
    showPages('fourthScreen');
})

// closeSliderViejo.addEventListener('click', () =>{
//     showPages('fifthScreen');
//     closeSliderViejo.style.display = 'none';
//     closeSlider.style.display = 'block';
//     save.style.display = 'none';
// })


// BOTONES DEL MODAL

seeResult.addEventListener('click', results);
tryAgain.addEventListener('click', () =>{
    resetear();
    showPages('firstScreen');
})


// BOTONES DE LA PANTALLA RESULTADO (fifthScreen)

save.addEventListener('click', guardarInfo);
exit.addEventListener('click', () =>{
    resetear()
    save.style.display = 'inline';
    showPages('firstScreen');
})
