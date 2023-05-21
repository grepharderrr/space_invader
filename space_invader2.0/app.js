const container = document.querySelector('.etoiles');                       //On selectionne la classe etoiles du html
const affichage = document.querySelector('h3');
let resultat = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20;
const buzz = document.querySelector('.buzz');
let score = document.querySelector('#score'); 






function creationEtoilesEtAliens() {                                         //on crée une fonction pour créer la grille et les aliens dedans

    let indexAttr = 0;                                                      //positionnement initial de l'index à 0

    for (i = 0; i < 240; i++) {                                               //boucle for pour parcourir la grille

        if (indexAttr === 0) {
            const bloc = document.createElement('div');                     //on déclare une constante et on crée un element qui est : div
            bloc.setAttribute('data-left', 'true');                         //on défini la position de notre élément : bloc
            container.appendChild(bloc);                                    //on déclare l'enfant de container qui est : bloc
            indexAttr++;                                                    // ici c'est l'iterateur (saut de ligne) de notre index
        }
        else if (indexAttr === 19) {                                          //le 19 represente le nombre de tour d'une boucle c'est un itérateur
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        }
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }
    }
    for (i = 1; i < 53; i++) {
        if (i === 13) {
            i = 21;
            alienInvaders.push(i);
        }
        else if (i === 33) {
            i = 41;
            alienInvaders.push(i);
        }
        else {
            alienInvaders.push(i);
        }
    }

    toutesLesDivs = document.querySelectorAll('.etoiles div');              //on selectionne toutes les divs que nous avons crée plus haut
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');                      //on crée une class dans le JS
    })

    toutesLesDivs[tireurPosition].classList.add('tireur');

}

creationEtoilesEtAliens()

function deplacerLeTireur(e) {
    toutesLesDivs[tireurPosition].classList.remove('tireur');               //on enleve la class tireur 

    if (e.keyCode === 37) {                                                   //le 37 correspond a la fleche gauche de notre clavier
        if (tireurPosition > 220) {
            tireurPosition -= 1;                                            //le tireur se deplace de 1 sur la gauche
        }
    }
    else if (e.keyCode === 39) {                                             //le 39 correspond a la fleche droite de notre clavier
        if (tireurPosition < 239) {
            tireurPosition += 1;                                            //le tireur se deplace de 1 sur la droite
        }
    }
    toutesLesDivs[tireurPosition].classList.add('tireur');                  //on remet la class tireur
}

document.addEventListener('keydown', deplacerLeTireur)


////////////////////////////////////// --- BOUGER LES ALIENS --- //////////////////////////////////////////////////

let descendreRight = true;
let descendreLeft = true;

function bougerLesAliens() {
    for (let i = 0; i < alienInvaders.length; i++) {

        if (toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true') { //on recupere l'attribut "data-right"

            if (descendreRight) {                                                     //Pour 
                direction = 20;
                setTimeout(() => {
                    descendreRight = false;
                }, 50);
            }
            else if (descendreRight === false) {
                direction = -1;
            }
            descendreLeft = true;
        }
        else if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true') {
            if(descendreLeft){
                direction = 20;
                setTimeout(() => {
                    descendreLeft = false;
                }, 50);
            }
            else if (descendreLeft === false) {
            direction = 1;
            }
            descendreRight = true;
        }
    }

    for(let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.remove('alien');
    }
    for(let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction;
    }
    for(let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
    }
    if(toutesLesDivs[tireurPosition].classList.contains('alien', 'tireur')){
        affichage.textContent = "GAME OVER";
        toutesLesDivs[tireurPosition].classList.add('boom');
        clearInterval(invaderID);
    }
    for(let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > toutesLesDivs.length - width){
            affichage.textContent = "GAME OVER";
            clearInterval(invaderId);
        }
    }
}

invaderId = setInterval(bougerLesAliens, 500);

////////////////////// LE LASER ///////////////////////////////////

function tirer(e){
    let laserId;
    let laserEnCours = tireurPosition;

    function deplacementLaser(){
        toutesLesDivs[laserEnCours].classList.remove('laser');
        laserEnCours -= width;
        toutesLesDivs[laserEnCours].classList.add('laser');

        if(toutesLesDivs[laserEnCours].classList.contains('alien')){
           toutesLesDivs[laserEnCours].classList.remove('laser');
           toutesLesDivs[laserEnCours].classList.remove('alien');
           toutesLesDivs[laserEnCours].classList.add('boom');

           score.innerHTML=parseInt(score.innerHTML)+1;

           alienInvaders = alienInvaders.filter(el => el !== laserEnCours)

           setTimeout(() => toutesLesDivs[laserEnCours].classList.remove('boom'),250)
           clearInterval(laserId);

           resultat++;
           if(resultat > 35){
            affichage.textContent = "Bravo ranger de l'espace, tu as exterminé la flotte de l'infâme Empereur Zurg !";
            buzz.style.display = 'block';
            clearInterval(invaderId);
            }
            
        }

        if(laserEnCours < width){
            clearInterval(laserId);
            setTimeout(() => {
                toutesLesDivs[laserEnCours].classList.remove('laser')
            }, 100)
        }
    }
    if(e.keyCode === 32){
        laserId = setInterval(() => {
            deplacementLaser();
        }, 100)
    }
}

document.addEventListener('keyup', tirer);