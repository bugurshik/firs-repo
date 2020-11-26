//#region Border-radius changes
const rangeTL = document.getElementById('tlr'),
  rangeTR = document.getElementById('trr'),
  rangeBL = document.getElementById('blr'),
  rangeBR = document.getElementById('brr')

const resultTL = document.getElementById('result-tlr'),
  resultTR = document.getElementById('result-trr'),
  resultBL = document.getElementById('result-blr'),
  resultBR = document.getElementById('result-brr')

const borderRadiusResult = document.getElementById('border-radius-result')

const target = document.getElementById('cube')
let unit = 'px'

target.addEventListener('click', function () {
  alert(this.self)
})

rangeTL.addEventListener('input', function () {
  set.borderTopLeft = this.value
})
rangeTR.addEventListener('input', function () {
  set.borderTopRight = this.value
})
rangeBL.addEventListener('input', function () {
  set.borderBottomLeft = this.value
})
rangeBR.addEventListener('input', function () {
  set.borderBottomRight = this.value
})
resultTL.addEventListener('input', function () {
  set.borderTopLeft = this.value.numericFilter().inRange(0, 100)
})
resultTR.addEventListener('input', function () {
  set.borderTopRight = this.value.numericFilter().inRange(0, 100)
})
resultBL.addEventListener('input', function () {
  set.borderBottomLeft = this.value.numericFilter().inRange(0, 100)
})
resultBR.addEventListener('input', function () {
  set.borderBottomRight = this.value.numericFilter().inRange(0, 100)
})
//Binding
//document.querySelectorAll('.input-range-border-radius').forEach((e) => e.addEventListener('input', changeBorderRadiusAll))
document.querySelectorAll('.add-elem').forEach((e) => e.addEventListener('click', changeElemVisibility))
for (node of document.querySelectorAll('.input-text-border-radius')) {
  node.addEventListener('focus', textInputOnFocus)
  node.addEventListener('blur', textInputBlur)
}

Object.defineProperty(HTMLElement.prototype, 'isOnDisplay', {
  get() {
    return window.getComputedStyle(this).display !== 'none'
  },
})
//Возвращает поседний элемент который не содержит класс
HTMLElement.prototype.lastChildBefore = function (stopClass) {
  let lastChild
  for (let element of this.children) {
    if (element.classList.contains(stopClass)) {
      break
    }
    lastChild = element
  }
  return lastChild ? lastChild : undefined
}
//Фильтрует текст. Возвращает только цифры
String.prototype.numericFilter = function () {
  return +this[0] ? +this.replace(/[^\d]/g, '') : ''
}
//Возвращает чисто в указанном диапазоне
Number.prototype.inRange = function (min, max) {
  return this < min ? min : this > max ? max : this
}

function toggleClassVisibility(...classElem) {
  alert(document.querySelectorAll(classElem).forEach((e) => e.classList.toggle('hide')))
}
function changeElemVisibility() {
  let lastChild = this.parentNode.lastChildBefore('hide')
  lastChild.classList.toggle('hide')
}
function textInputOnFocus() {
  this.value = this.value == 0 ? '' : this.value
}
function textInputBlur() {
  this.value = this.value == 0 ? 0 : this.value
}

function changeBorderRadiusAll() {
  if (this.type == 'text') this.value = this.value.numericFilter().inRange(0, 100)
}

const set = {
  //border
  get border() {
    return `${this._borderWidht}px ${this._borderStyle} ${this._borderColor}`
  },
  borderUpdate() {
    target.style.border = this.border
    this.borderResultElementId.innerHTML = 'border: ' + this.border
  },
  set borderWidht(newValue) {
    this._borderWidht = newValue
    this.borderUpdate()
  },
  set borderStyle(newValue) {
    this._borderStyle = newValue
    this.borderUpdate()
  },
  set borderColor(newValue) {
    this._borderColor = newValue
    this.borderUpdate()
  },
  borderInputElementId: document.getElementById('border-I'),
  borderResultElementId: document.getElementById('result-border'),
  _border: '0 0 0',
  _borderWidht: 0,
  _borderStyle: 'none',
  _borderColoe: 'black',

  //border-radius
  get borderRadius() {
    return `${this.borderTopLeft} ${this.borderTopRight} ${this.borderBottomRight} ${this.borderBottomLeft}`
  },
  borderRadiusUpdate() {
    target.style.borderRadius = this.borderRadius
    //alert(this.borderRadius)
    borderRadiusResult.innerHTML = 'border-radius: ' + this.borderRadius + ';'
  },
  get borderTopLeft() {
    return rangeTL.parentNode.isOnDisplay ? this._borderTopLeft + unit : ''
  },
  set borderTopLeft(newValue) {
    this._borderTopLeft = newValue
    resultTL.value = newValue
    this.borderRadiusUpdate()
  },
  get borderTopRight() {
    return rangeTR.parentNode.isOnDisplay ? this._borderTopRight + unit : ''
  },
  set borderTopRight(newValue) {
    this._borderTopRight = newValue
    resultTR.value = newValue
    this.borderRadiusUpdate()
  },
  get borderBottomRight() {
    return rangeBR.parentNode.isOnDisplay ? this._borderBottomRight + unit : ''
  },
  set borderBottomRight(newValue) {
    this._borderBottomRight = newValue
    resultBR.value = newValue
    this.borderRadiusUpdate()
  },
  get borderBottomLeft() {
    return rangeBL.parentNode.isOnDisplay ? this._borderBottomLeft + unit : ''
  },
  set borderBottomLeft(newValue) {
    this._borderBottomLeft = newValue
    resultBL.value = newValue
    this.borderRadiusUpdate()
  },
  _borderTopLeft: 0,
  _borderTopRight: 0,
  _borderBottomRight: 0,
  _borderBottomLeft: 0,

  //box-shadow
  get boxShadow() {
    return `${this._boxShadowOffsetX}px ${this._boxShadowOffsetY}px ${this._boxShadowBlur}px ${this._boxShadowSpread}px 
    ${this._boxShadowColor} ${this._boxShadowInset}`
  },
  boxShadowUpdate() {
    target.style.boxShadow = this.boxShadow
    document.getElementById('result-shadow').innerHTML = 'box-shadow: ' + this.boxShadow
  },
  set boxShadowInset(newValue) {
    this._boxShadowInset = newValue ? 'inset' : ''
    this.boxShadowUpdate()
  },
  set boxShadowOffsetX(newValue) {
    this._boxShadowOffsetX = newValue
    this.boxShadowUpdate()
  },
  set boxShadowOffsetY(newValue) {
    this._boxShadowOffsetY = newValue
    this.boxShadowUpdate()
  },
  set boxShadowBlur(newValue) {
    this._boxShadowBlur = newValue
    this.boxShadowUpdate()
  },
  set boxShadowSpread(newValue) {
    this._boxShadowSpread = newValue
    this.boxShadowUpdate()
  },
  set boxShadowColor(newValue) {
    this._boxShadowColor = newValue
    this.boxShadowUpdate()
  },
  _boxShadowOffsetX: '0',
  _boxShadowOffsetY: '0',
  _boxShadowBlur: '0',
  _boxShadowSpread: '0',
  _boxShadowColor: 'black',
  _boxShadowInset: '',
}

//debug sreen size
const scrSizeElem = document.getElementById('screen-size')
function showWindowSize() {
  scrSizeElem.innerHTML = document.documentElement.scrollWidth
}
document.addEventListener('DOMContentLoaded', function () {
  window.onresize = showWindowSize
})

//Loading image
const imgInput = document.getElementById('input-file')
const imgOutput = document.getElementById('outImage')

function OnLoaded(evt) {
  var tgt = evt.target || window.event.srcElement,
    files = tgt.files
  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader()
    fr.onload = function () {
      imgOutput.src = fr.result
    }
    fr.readAsDataURL(files[0])

    imgOutput.style.width = '50px'
    imgOutput.style.height = '50px'
  }
  // Not supported
  else {
    alert('err')
  }
}

//открыть & закрыть левое меню(при маленьком размере экрана)
const navToggle = document.getElementById('label-toggle')
const nav = document.getElementById('lpanel')
function toToggleNav() {
  nav.classList.toggle('open')
  navToggle.classList.toggle('open')
}

//Копирование содержимого в буфер
function copyToBuffer(textContainer) {
  //выделение текста
  let selectedRange = document.createRange()
  selectedRange.selectNode(document.getElementById(textContainer))
  window.getSelection().addRange(selectedRange)
  //пытаемся скопировать текст в буфер обмена
  try {
    document.execCommand('copy')
  } catch (err) {
    console.log('Can`t copy, boss')
  }
  //очистим выделение текста, чтобы пользователь "не парился"
  window.getSelection().removeAllRanges()
}

Object.defineProperty(String.prototype, 'prop', {
  get() {
    return this
  },
})
