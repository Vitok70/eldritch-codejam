
//   активация карты Древнего + вызов кнопки "Уровень сложности"
  let ancientCard = document.querySelector('.ancient-card');
  
  ancientCard.addEventListener('click', () =>{
    ancientCard.classList.toggle('activeAncientsCard');
    difficulty.classList.toggle('visible');
    difficulty.classList.remove('active');
    shuffleBtn.classList.remove('shuffleButton');
    deckCardBack.classList.remove('visible');
    lastCard.classList.remove('visible');
  });


//   активация кнопки "Уровень сложности" и вывод кнопки "Замешать колоду"
 let difficulty = document.querySelector('.difficulty');
 let shuffleBtn = document.querySelector('.shuffle-button');

  difficulty.addEventListener('click',() => {
    if (difficulty.classList.contains('active')){
      shuffleBtn.classList.remove('shuffleButton');
      deckCardBack.classList.remove('visible');
      difficulty.classList.remove('active');
      lastCard.classList.remove('visible');
     }
    else {
      difficulty.classList.add('active');
      shuffleBtn.classList.add('shuffleButton');
    }
  });


  let arrFinal = [];  // финальный массив-стек


  // ЗАМЕШИВАНИЕ КОЛОДЫ !!!!!!!!!!!!!!
  let deckCardBack = document.querySelector('.deck');
  shuffleBtn.addEventListener('click', () => {
    deckCardBack.classList.add('visible');
    shuffleBtn.classList.remove('shuffleButton');
    // формирование итогового массива-стэка
    arrFinal = [];   
    arrFinal = arrFinal.concat(firstFinal(),secondFinal(),thirdFinal());
    console.log(arrFinal);
 });
  

// вызов карты из сформированной колоды карт поочередно по одной на каждый клик
let countCards = 0;
let lastCard = document.querySelector('.last-card');
let image = document.querySelector('.image');
    
deckCardBack.addEventListener('click', () => {
   lastCard.classList.add('visible');
   image.removeAttribute('src');
   image.setAttribute('src', `${arrFinal[countCards].cardFace}`);
   countCards++;
  if (countCards > arrFinal.length - 1) {
    deckCardBack.classList.remove('visible');
    countCards = 0;
  }

});



// ФУНКЦИИ ЗАМЕШИВАНИЯ И СОЗДАНИЯ КОЛОДЫ СОГЛАСНО СХЕМЕ ДРЕВНЕГО

  // функция создания рандомного числа от min до max
  function randomNumber(min, max){
    return Math.floor(min + Math.random() * (max + 1 - min));
}

// импорт данных о схеме Древнего
import ancientsCards from './data/ancients.js';

  
// функция подсчета количества ЗЕЛЕНЫХ карт, требуемых по схеме Древнего
function greenCards() {
  let greenSum = ancientsCards[0].firstStage.greenCards + 
  ancientsCards[0].secondStage.greenCards + 
  ancientsCards[0].thirdStage.greenCards;
  return greenSum;
}

// функция подсчета количества КОРИЧНЕВЫХ карт, требуемых по схеме Древнего
function brownCards() {
  let brownSum = ancientsCards[0].firstStage.brownCards + 
  ancientsCards[0].secondStage.brownCards + 
  ancientsCards[0].thirdStage.brownCards;
  return brownSum;
}

// функция подсчета количества ГОЛУБЫХ карт, требуемых по схеме Древнего
function blueCards() {
  let blueSum = ancientsCards[0].firstStage.blueCards + 
  ancientsCards[0].secondStage.blueCards + 
  ancientsCards[0].thirdStage.blueCards;
  return blueSum;
}


// импорт данных о колодах карт
import cardsDataGreen from './data/mythicCards/green/index.js'
import cardsDataBrown from './data/mythicCards/brown/index.js'
import cardsDataBlue from './data/mythicCards/blue/index.js'

// функция формирования мини-колоды из ЗЕЛЕНЫХ карт в количестве, требуемом по схеме Древнего
function greenRandomArr(){
  let greenStopka = [];
  let copyCards = [...cardsDataGreen]; 
  let max = copyCards.length-1;   // макс. порядковый номер в массиве зеленых карт
  let greenSum = greenCards(); 
      for (let i = 1; i <= greenSum; i++) { //число иттераций зеленых карт
      let r = randomNumber(0, max);
      greenStopka.push(copyCards[r]);
      copyCards.splice(r, 1);
      max--;
  }
  return greenStopka;
} 

// функция формирования мини-колоды из КОРИЧНЕВЫХ карт в количестве, требуемом по схеме Древнего
function brownRandomArr(){
  let brownStopka = [];
  let copyCards = [...cardsDataBrown]; 
  let max = copyCards.length-1;
  let brownSum = brownCards();
  for (let i = 1; i <= brownSum; i++) {
      let r = randomNumber(0, max);
      brownStopka.push(copyCards[r]);
      copyCards.splice(r, 1);
      max--;
  }
  return brownStopka;
} 

// функция формирования мини-колоды из ГОЛУБЫХ карт в количестве, требуемом по схеме Древнего
function blueRandomArr(){
  let blueStopka = [];
  let copyCards = [...cardsDataBlue]; // создать копию
  let max = copyCards.length-1;
  let blueSum = blueCards();
    for (let i = 1; i <= blueSum; i++) {
      let r = randomNumber(0, max);
      blueStopka.push(copyCards[r]);
      copyCards.splice(r, 1);
      max--;
      
  }
  return blueStopka;
} 

// перeменные стопок-массивов карт участвующих в игре
let  greenStopka;
let  brownStopka;
let  blueStopka;

// !!!!!! ***********  !!!!!!!   *******************
// функция создания предварительной колоды 1-го этапа схемы Древнего
function firstPrev(){
// создание стопок-массивок карт участвующих в игре при клике на кнопку "Замешать колоду"
   greenStopka = greenRandomArr(); 
   brownStopka = brownRandomArr();
   blueStopka = blueRandomArr();

   let arrFirst =[];  // предварительная колода 1-го уровня
   let greenFirst = ancientsCards[0].firstStage.greenCards; //количество иттераций - количество зеленых карт 1-го уровня
   let brownFirst = ancientsCards[0].firstStage.brownCards;
   let blueFirst = ancientsCards[0].firstStage.blueCards;
  
   for (let i = 1; i <= greenFirst; i++){  // помещение в массив 1-го уровня зеленых карт
      let max = greenStopka.length-1;
      let r = randomNumber(0,max);
      arrFirst.push(greenStopka[r]);
      greenStopka.splice(r, 1);
    }

    for (let i = 1; i <= brownFirst; i++){  // помещение в массив 1-го уровня КОРИЧНЕВЫХ карт
      let max = brownStopka.length-1;
      let r = randomNumber(0,max);
      arrFirst.push(brownStopka[r]);
      brownStopka.splice(r, 1);
    }

    for (let i = 1; i <= blueFirst; i++){   // помещение в массив 1-го уровня ГОЛУБЫХ карт
      let max = blueStopka.length-1;
      let r = randomNumber(0,max);
      arrFirst.push(blueStopka[r]);
      blueStopka.splice(r, 1);
    }
      return arrFirst;
}

// функция создания окончательной колоды 1-го этапа схемы Древнего
function firstFinal(){
let arrFirstFinal =[];   // окончательная колода 1-го уровня созданная рандомно 
let arrFirst = firstPrev();
let firstQuantity = ancientsCards[0].firstStage.greenCards + ancientsCards[0].firstStage.brownCards + ancientsCards[0].firstStage.blueCards;
  
for (let i = 1; i <= firstQuantity; i++){ // кол-во иттераций - количество карт 1-го уровня
    let max = arrFirst.length-1;
    let r = randomNumber(0,max);
    arrFirstFinal.push(arrFirst[r]);
    arrFirst.splice(r, 1);
  }
    return arrFirstFinal;
}


// !!!!!! ***********************  !!!!!!!!!!!!!!!!!!!
// функция создания предварительной колоды 2-го этапа схемы Древнего
function secondPrev(){
  let arrSecond =[];  // предварительная колода 2-го уровня
  let greenSecond = ancientsCards[0].secondStage.greenCards; //количество иттераций - количество зеленых карт 1-го уровня
  let brownSecond = ancientsCards[0].secondStage.brownCards;
  let blueSecond = ancientsCards[0].secondStage.blueCards;
    
  for (let i = 1; i <= greenSecond; i++){  // помещение в массив 1-го уровня зеленых карт
     let max = greenStopka.length-1;
     let r = randomNumber(0,max);
     arrSecond.push(greenStopka[r]);
     greenStopka.splice(r, 1);
    
   }
   for (let i = 1; i <= brownSecond; i++){  // помещение в массив 1-го уровня RКОРИЧНЕВЫХ карт
     let max = brownStopka.length-1;
     let r = randomNumber(0,max);
     arrSecond.push(brownStopka[r]);
     brownStopka.splice(r, 1);
    
   }
   for (let i = 1; i <= blueSecond; i++){   // помещение в массив 2-го уровня ГОЛУБЫХ карт
     let max = blueStopka.length-1;
     let r = randomNumber(0,max);
     arrSecond.push(blueStopka[r]);
     blueStopka.splice(r, 1);
     
   }
 return arrSecond;
}


// функция создания окончательной колоды 2-го этапа схемы Древнего
function secondFinal(){
  let arrSecondFinal =[];   // окончательная колода 2-го уровня созданная рандомно 
  let arrSecond = secondPrev();
  let secondQuantity = ancientsCards[0].secondStage.greenCards + ancientsCards[0].secondStage.brownCards + ancientsCards[0].secondStage.blueCards;
    for (let i = 1; i <= secondQuantity; i++){ // кол-во иттераций - количество карт 2-го уровня
      let max = arrSecond.length-1;
      let r = randomNumber(0,max);
      arrSecondFinal.push(arrSecond[r]);
      arrSecond.splice(r, 1);
      
    }
    return arrSecondFinal;
  }


// !!!!!!!!!!!  ******************!!!!!!!!!!!!!!!!!!
// функция создания предварительной колоды 3-го этапа схемы Древнего
function thirdPrev() {
let arrThird =[];  // предварительная колода 3-го уровня
let greenThird = ancientsCards[0].thirdStage.greenCards; //количество иттераций - количество зеленых карт 3-го уровня
  let brownThird = ancientsCards[0].thirdStage.brownCards;
  let blueThird = ancientsCards[0].thirdStage.blueCards;
      
  for (let i = 0; i < greenThird; i++){ arrThird.push(greenStopka[i])};
  for (let i = 0; i < brownThird; i++){ arrThird.push(brownStopka[i])};
  for (let i = 0; i < blueThird; i++){ arrThird.push(blueStopka[i])};
    
  return arrThird;
}

// функция создания окончательной колоды 3-го этапа схемы Древнего
function thirdFinal(){
  let arrThirdFinal =[];   // окончательная колода 3-го уровня созданная рандомно 
  let arrThird = thirdPrev();
  let thirdQuantity = ancientsCards[0].thirdStage.greenCards + ancientsCards[0].thirdStage.brownCards + ancientsCards[0].thirdStage.blueCards;
    for (let i = 1; i <= thirdQuantity; i++){ // кол-во иттераций - количество карт 3-го уровня
      let max = arrThird.length-1;
      let r = randomNumber(0,max);
      arrThirdFinal.push(arrThird[r]);
      arrThird.splice(r, 1);
     
    }
    return arrThirdFinal;
  }
 



// function firstPrev(){
//   let greenStopka = greenRandomArr(); // массив из мини-колоды зеленых карт
//   console.log(greenStopka);
//   let brownStopka = brownRandomArr();
//   console.log(brownStopka);
//   let blueStopka = blueRandomArr();
//   console.log(blueStopka);

//   const stopkasArr = {greenStopka, brownStopka, blueStopka}; 
 

//   let arrFirst =[];  // предварительная колода 1-го уровня
//   let colorArr=['green', 'brown', 'blue']; // массив цветов карт
  
//   colorArr.forEach(color => {
//     const colorWithCards = `${color}Cards`;
//     let currentColorArr = stopkasArr[`${color}Stopka`];
//     let max = ancientsCards[0].firstStage[colorWithCards];
//     for (let i = 0; i < max; i++){
//      let randomNum = randomNumber(0, currentColorArr.length - 1);
//       arrFirst.push(currentColorArr[randomNum]);
//       currentColorArr.splice(randomNum, 1);
//     }
//   })

//   return arrFirst;
// }