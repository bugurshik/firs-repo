const target = document.getElementById('cube')
let unit = 'px'

//Фильтрует текст. Возвращает только цифры
String.prototype.numericFilter = function () {
  return +this[0] ? +this.replace(/[^\d]/g, '') : ''
}
//Возвращает чисто в указанном диапазоне
Number.prototype.inRange = function (min, max) {
  return this < min ? min : this > max ? max : this
}

class Input {
  constructor(firstId, secondId = 0) {
    if (secondId) {
      console.log(this)
      this.range = document.getElementById(firstId)
      this.text = document.getElementById(secondId)
      this.parentNode = this.range.parentNode
      this.addDoubleInputEvent()
    } else {
      this.input = document.getElementById(firstId)
      this.parentNode = this.input.parentNode
      this.addInputEvent()
    }
  }
  _value = 0
  set value(newValue) {
    this._value = newValue
    border.update()
  }
  get value() {
    return this.parentNode.isOnDisplay ? this._value + unit : ''
  }
  //#region [Select]
  addInputEvent() {
    let docElement = this
    docElement.input.addEventListener('input', function () {
      docElement.value = this.value
    })
  }
  addDoubleInputEvent() {
    let docElement = this
    docElement.text.addEventListener('input', function () {
      docElement.value = this.value.numericFilter().inRange(0, 100)
      docElement.range.value = this.value
    })
    docElement.range.addEventListener('input', function () {
      docElement.value = this.value
      docElement.text.value = this.value
    })
  }
  //#endregion
}

let borderRad = {
  tl: new Input('input-tlr', 'input-text-tlr'),
  tr: new Input('input-trr', 'input-text-trr'),
  bl: new Input('input-blr', 'input-text-blr'),
  br: new Input('input-brr', 'input-text-brr'),
  output: document.getElementById('border-radius-result'),

  update() {
    let newValue = this.value
    target.style.borderRadius = newValue
    this.output.innerHTML = 'border-radius ' + newValue + ';'
  },
  get value() {
    return this.tl.value + ' ' + this.tr.value + ' ' + this.bl.value + ' ' + this.br.value
  },
}

let border = {
  width: new Input('I-border-width'),
  style: new Input('I-border-style'),
  color: new Input('I-border-color'),
  output: document.getElementById('border-result'),

  update() {
    let newValue = this.value
    target.style.border = newValue
    this.output.innerHTML = 'border: ' + newValue + ';'
  },
  get value() {
    return this.width.value + ' ' + this.style.value + ' ' + this.color.value
  },
}
Object.defineProperty(borderRad.tl, 'value', {
  set(newValue) {
    borderRad.tl._value = newValue
    borderRad.update()
  },
})
//Binding
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

function toggleClassVisibility(...classElem) {
  document.querySelectorAll(classElem).forEach((e) => e.classList.toggle('hide'))
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

const set = {
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

//#region [Mobile]

//открыть & закрыть левое меню(при маленьком размере экрана)
const navToggle = document.getElementById('label-toggle')
const nav = document.getElementById('lpanel')
function toToggleNav() {
  nav.classList.toggle('open')
  navToggle.classList.toggle('open')
}
//#endregion
//#region [Tests]

//#endregion
