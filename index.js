// get param from url
const urlParams = new URLSearchParams(window.location.search);

const inputs = [
  {
    id: 'devis',
    isEditable: true,
    input: document.getElementById('devis'),
    value: 0,
    text: null,
  },
  {
    id: 'cart',
    isEditable: true,
    input: document.getElementById('cart'),
    value: 0,
    text: null,
  },
  {
    id: 'margePourcent',
    isEditable: true,
    input: document.getElementById('margePourcent'),
    value: 0,
    text: null,
  },
  {
    id: 'taux',
    isEditable: true,
    input: document.getElementById('taux'),
    value: 0,
    text: null,
  },
  {
    id: 'tauxVR',
    isEditable: false,
    input: document.getElementById('tauxVR'),
    value: '69%',
    text: 'Valeur constatée suite à une étude réalisée auprès de nos clients,' +
      ' concernant 109 projets visualisés sur notre outil sur la période 01/01/2022 - 30/08/2022',
  },
  {
    id: 'projectSell',
    isEditable: false,
    input: document.getElementById('projectSell'),
    value: 0,
    text: null,
  },
  {
    id: 'projectSellVR',
    isEditable: false,
    input: document.getElementById('projectSellVR'),
    value: 0,
    text: null,
  },
  {
    id: 'ca',
    isEditable: false,
    input: document.getElementById('ca'),
    value: 0,
    text: null,
  },
  {
    id: 'caVR',
    isEditable: false,
    input: document.getElementById('caVR'),
    value: 0,
    text: null,
  },
  {
    id: 'marge',
    isEditable: false,
    input: document.getElementById('marge'),
    value: 0,
    text: null,
  },
  {
    id: 'margeVR',
    isEditable: false,
    input: document.getElementById('margeVR'),
    value: 0,
    text: null,
  },
];

let devis = inputs.find((input) => input.id === 'devis');
let cart = inputs.find((input) => input.id === 'cart');
let margePourcent = inputs.find((input) => input.id === 'margePourcent');
let taux = inputs.find((input) => input.id === 'taux');
let tauxVR = inputs.find((input) => input.id === 'tauxVR');
let projectSell = inputs.find((input) => input.id === 'projectSell');
let projectSellVR = inputs.find((input) => input.id === 'projectSellVR');
let ca = inputs.find((input) => input.id === 'ca');
let caVR = inputs.find((input) => input.id === 'caVR');
let marge = inputs.find((input) => input.id === 'marge');
let margeVR = inputs.find((input) => input.id === 'margeVR');

// for each value in inputs get all with text different of null
// for each od them get HTML element with id = id + '-text'
// set the text of the element to the text of the input
function updateText() {
  inputs.forEach(obj => {
    if (obj.text) {
      const element = document.getElementById(obj.id + '-text');
      element.innerText = obj.text;
      if (obj.id.includes('VR')) {
        const card = document.getElementById(obj.id.replace('VR', '')).parentElement;
        card.style.marginBottom = element.offsetHeight + 34 + 'px';
      }
    }
  });
}

function calculer() {
  // faire les calcule pour la partie sans VR
  if (taux.value && devis.value) {
    const res = (devis.value * taux.value.replace('%', '') / 100).toFixed(0);
    projectSell.value = res;
    projectSell.input.value = res;
  }
  if (projectSell.value && cart.value) {
    const res = projectSell.value * cart.value.replace('€', '');
    ca.value = res + '€';
    ca.input.value = res + '€';
  }
  if (ca.value && margePourcent.value) {
    const res = (ca.value.replace('€', '') * margePourcent.value.replace('%', '')) / 100;
    marge.value = res + '€';
    marge.input.value = res + '€';
  }
  // faire les calcule pour la partie avec VR
  if (tauxVR.value && devis.value) {
    const res = (devis.value * tauxVR.value.replace('%', '') / 100).toFixed(0);
    projectSellVR.value = res;
    projectSellVR.input.value = res;
    if (projectSell.value) {
      projectSellVR.text = '+ ' + (projectSellVR.value - projectSell.value);
    }
  }
  if (projectSellVR.value && cart.value) {
    const res = projectSellVR.value * cart.value.replace('€', '');
    caVR.value = res + '€';
    caVR.input.value = res + '€';
    if (ca.value) {
      caVR.text = '+ ' + (caVR.value.replace('€', '') - ca.value.replace('€', '')) + '€';
    }
  }
  if (caVR.value && margePourcent.value) {
    const res = (caVR.value.replace('€', '') * margePourcent.value.replace('%', '')) / 100;
    margeVR.value = res + '€';
    margeVR.input.value = res + '€';
    if (marge.value) {
      margeVR.text = '+ ' + (margeVR.value.replace('€', '') - marge.value.replace('€', '')) + '€';
    }
  }
  updateText();
  console.log(inputs);
}

// for each value in inputsEditable get the param
// set the value of the param to the value of the input
inputs.forEach(obj => {
  if (obj.isEditable) {
    const param = urlParams.get(obj.id);
    if (param) {
      obj.value = param;
      obj.input.value = param;
    }
  }
});

// for each value in inputsEditable get the input
// add an event listener to the input
// when the input is changed, update the url
inputs.forEach(obj => {
  const input = obj.input;
  input.addEventListener('change', () => {
    const url = new URL(window.location.href);
    url.searchParams.set(obj.id, input.value);
    obj.value = input.value;
    window.history.pushState({}, '', url);
    calculer();
  });
});

calculer();