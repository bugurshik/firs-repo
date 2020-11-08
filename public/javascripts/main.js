//#region Border-radius changes
const rangeTL = document.getElementById('tlr'),
      rangeTR = document.getElementById('trr'),
      rangeBL = document.getElementById('blr'),
      rangeBR = document.getElementById('brr');

const resultTL = document.getElementById('result-tlr'),
      resultTR = document.getElementById('result-trr'),
      resultBL = document.getElementById('result-blr'),
      resultBR = document.getElementById('result-brr');
const resultBrRad = document.getElementById('relust_border-radius');

const cube = document.getElementById('cube');
const resultBrRadius = document.getElementById('result_border-radius');

const NumInRange = function (num, min, max) {
  return (num < min)? min: (num > max)? max: num;  
}

const compareInput = {
  tlr: resultTL,
  trr: resultTR,
  blr: resultBL,
  brr: resultBR,
  ['result-tlr']: rangeTL,
  ['result-trr']: rangeTR,
  ['result-blr']: rangeBL,
  ['result-brr']: rangeBR
}

const changeBorderRadius = function() {
  if(this.type=='text'){
    this.value = this.value.replace(/[^\d]/g,'');
    if(!+this.value[0]){ 
      this.value = '';
    }
    this.value = NumInRange(+this.value, 0, 100);
  }
  compareInput[this.id].value = this.value;

  cube.style.borderRadius =  rangeTL.value + 'px ' + rangeTR.value + 'px ' + rangeBR.value + 'px ' + rangeBL.value + 'px';
  resultBrRadius.innerHTML =  rangeTL.value + ' ' + rangeTR.value + ' ' + rangeBR.value + ' ' + rangeBL.value + ' ';
  resultBrRad.innerHTML = 'border-radius: ' + rangeTL.value + ' ' + rangeTR.value + ' ' + rangeBR.value + ' ' + rangeBL.value + ';';
}

const textInputOnFocus = function() {
  this.value = this.value == 0? '': this.value;
}
const textInputBlur = function() {
  this.value = this.value == 0? 0: this.value;
}

//Binding 
document
.querySelectorAll('.input-range-border-radius')
.forEach( (e) => e.addEventListener('input', changeBorderRadius) )

for (node of document.querySelectorAll('.input-text-border-radius')) {
  node.addEventListener('input', changeBorderRadius)
  node.addEventListener('focus', textInputOnFocus)
  node.addEventListener('blur', textInputBlur)
}
//#endregion

//Елементы копирования 
const Copy = {
  contentBox: document.getElementById('result-box__text-box'),
  ToBuffer: function () {
    //выделение текста
    let selectedRange = document.createRange();
    selectedRange.selectNode(this.contentBox); 
    window.getSelection().addRange(selectedRange); 
    //пытаемся скопировать текст в буфер обмена
    try { 
      document.execCommand('copy'); 
    } catch(err) { 
      console.log('Can`t copy, boss'); 
    } 
    //очистим выделение текста, чтобы пользователь "не парился"
    window.getSelection().removeAllRanges();
  }
};

const border = {

  style:  {
    documentResult: document.getElementById('relust_border-style'),
    change: function(newStyle, textResult = 'border-style: ',) {
      cube.style.borderStyle = newStyle;
      this.documentResult.innerHTML = textResult + newStyle + ';';
    }
  },


  widht: {
    documentResult: document.getElementById('relust_border-widht'),
    documentInput: document.getElementById('range-border-widht'),
    change: function(NewWidht) {
      cube.style.borderWidth = NewWidht + 'px ';
      this.documentResult.innerHTML = 'border-widht: ' + NewWidht + ';';
    }  
  },
  color: {
    documentResult: document.getElementById('relust_border-color'),
    change: function (NewColor) {
      cube.style.borderColor = NewColor;
      this.documentResult.innerHTML = 'border-color: '  + NewColor + ';';
    }
  },

  radius: {
    rangeTL: document.getElementById('tlr'),
    rangeTR: document.getElementById('trr'),
    rangeBL: document.getElementById('blr'),
    rangeBR: document.getElementById('brr'),

    resultTL: document.getElementById('result-tlr'),
    resultTR: document.getElementById('result-trr'),
    resultBL: document.getElementById('result-blr'),
    resultBR: document.getElementById('result-brr'),
    TotalResult: document.getElementById('relust_border-radius'),

    change: function(position, value) {

    },
  }
};

const OnLoaded = function (a) {
    //if(a) document.getElementById('img').src = a.value;
}