//#region Border-radius changes
const rangeTL = document.getElementById('tlr'),
    rangeTR = document.getElementById('trr'),
    rangeBL = document.getElementById('blr'),
    rangeBR = document.getElementById('brr')

const resultTL = document.getElementById('result-tlr'),
    resultTR = document.getElementById('result-trr'),
    resultBL = document.getElementById('result-blr'),
    resultBR = document.getElementById('result-brr')

const resultBrRadius = document.getElementById('result_border-radius')

const target = document.getElementById('cube')
const tet = {
    rangeTL: document.getElementById('tlr'),
    rangeTR: document.getElementById('trr'),
    rangeBL: document.getElementById('blr'),
    rangeBR: document.getElementById('brr'),

    resultTL: document.getElementById('result-tlr'),
    resultTR: document.getElementById('result-trr'),
    resultBL: document.getElementById('result-blr'),
    resultBR: document.getElementById('result-brr'),
}

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
const changeElemVisibility = function () {
    let lastChild = this.parentNode.lastChildBefore('hide')
    alert(lastChild.className)
    if (!lastChild.classList.contains('hide')) {
        lastChild.className += ' hide'
    } else {
        lastChild.className = lastChild.className.replace(' hide', '')
    }
}

const compareInput = {
    tlr: resultTL, //1-all  2,3,4-top-left
    trr: resultTR, //2,3-topRight &bottomLeft 4- top-Right
    blr: resultBL, //3,4-bottom-Right
    brr: resultBR, //4-bottom-left
    ['result-tlr']: rangeTL,
    ['result-trr']: rangeTR,
    ['result-blr']: rangeBL,
    ['result-brr']: rangeBR,
}
const changeBorderRadiusAll = function () {
    let elem = 0
    if (this.type == 'text') this.value = this.value.numericFilter().inRange(0, 100)
    for (let val in tet) {
        if (window.getComputedStyle(tet[val].parentNode).display !== 'none') elem++
    }
    switch (elem / 2) {
        case 4:
            target.style.borderRadius = rangeTL.value + 'px ' + rangeTR.value + 'px ' + rangeBR.value + 'px ' + rangeBL.value + 'px'
            resultBrRadius.innerHTML = 'border-radius: ' + rangeTL.value + ' ' + rangeTR.value + ' ' + rangeBR.value + ' ' + rangeBL.value + ';'
            break

        case 3:
            compareInput[this.id].value = this.value
            target.style.borderRadius = rangeTL.value + 'px ' + rangeTR.value + 'px ' + rangeBR.value + 'px '
            resultBrRadius.innerHTML = 'border-radius: ' + rangeTL.value + ' ' + rangeTR.value + ' ' + rangeBL.value + ';'
            break

        case 2:
            compareInput[this.id].value = this.value
            target.style.borderRadius = rangeTL.value + 'px ' + rangeTR.value + 'px '
            resultBrRadius.innerHTML = 'border-radius: ' + rangeTL.value + 'px ' + rangeTR.value + 'px;'
            break
        case 1:
            compareInput[this.id].value = this.value
            target.style.borderRadius = rangeTL.value + 'px '
            resultBrRadius.innerHTML = 'border-radius: ' + rangeTL.value + 'px '
            break
    }
}

const textInputOnFocus = function () {
    this.value = this.value == 0 ? '' : this.value
}
const textInputBlur = function () {
    this.value = this.value == 0 ? 0 : this.value
}

//Binding
document.querySelectorAll('.input-range-border-radius').forEach((e) => e.addEventListener('input', changeBorderRadiusAll))

document.querySelectorAll('.add-elem').forEach((e) => e.addEventListener('click', changeElemVisibility))

for (node of document.querySelectorAll('.input-text-border-radius')) {
    node.addEventListener('input', changeBorderRadiusAll)
    node.addEventListener('focus', textInputOnFocus)
    node.addEventListener('blur', textInputBlur)
}

//Елементы копирования
const Copy = {
    contentBox: document.getElementById('result-box__text-box'),
    ToBuffer() {
        //выделение текста
        let selectedRange = document.createRange()
        selectedRange.selectNode(this.contentBox)
        window.getSelection().addRange(selectedRange)
        //пытаемся скопировать текст в буфер обмена
        try {
            document.execCommand('copy')
        } catch (err) {
            console.log('Can`t copy, boss')
        }
        //очистим выделение текста, чтобы пользователь "не парился"
        window.getSelection().removeAllRanges()
    },
}

const get = {
    get border() {
        return `${this.borderWidht}px ${this.borderStyle} ${this.borderColor}`
    },
    borderWidht: 0,
    borderStyle: 'none',
    borderColor: '#111111',

    get borderRadius() {
        return `${this.borderTopLeft}px ${this.borderTopRight}px ${this.borderBottomRight}px ${this.borderBottomLeft}px`
    },
    borderTopLeft: 0,
    borderTopRight: 0,
    borderBottomRight: 0,
    borderBottomLeft: 0,

    get boxShadow() {
        return `${this.boxShadowOffsetX}px ${this.boxShadowOffsetY}px ${this.boxShadowBlur}px ${this.boxShadowSpread}px 
    ${this.boxShadowColor} ${this.boxShadowInset}`
    },
    boxShadowOffsetX: '0',
    boxShadowOffsetY: '0',
    boxShadowBlur: '0',
    boxShadowSpread: '0',
    boxShadowColor: '',
    boxShadowInset: '',
}

const set = {
    //border
    px: 'px ',
    border() {
        return `${this.borderWidht}px ${this.borderStyle} ${this.borderColor}`
    },
    borderUpdate(resultId) {
        target.style.border = get.border
        document.getElementById(resultId).innerHTML = 'border: ' + get.border
    },
    borderWidht(newValue, resultId) {
        get.borderWidht = newValue
        this.borderUpdate(resultId)
    },
    borderStyle(newValue, resultId) {
        get.borderStyle = newValue
        this.borderUpdate(resultId)
    },
    borderColor(newValue, resultId) {
        get.borderColor = newValue
        this.borderUpdate(resultId)
    },

    //border-radius
    borderRadiusUpdate(resultId) {
        target.style.borderRadius = get.borderRadius
        document.getElementById(resultId).innerHTML = 'border-radius: ' + get.borderRadius
    },
    borderRadius(newValue, resultId) {
        get.borderTopLeft = newValue
        get.borderTopRight = ''
        get.borderBottomRight = ''
        get.borderBottomLeft = ''
        this.borderRadiusUpdate(resultId)
    },
    borderTopLeft(newValue, resultId) {
        get.borderTopLeft = newValue
        this.borderRadiusUpdate(resultId)
    },
    borderTopRight(newValue, resultId) {
        get.borderTopRight = newValue
        this.borderRadiusUpdate(resultId)
    },
    borderBottomRight(newValue, resultId) {
        get.borderBottomRight = newValue
        this.borderRadiusUpdate(resultId)
    },
    borderBottomRight(newValue, resultId) {
        get.borderBottomLeft = newValue
        this.borderRadiusUpdate(resultId)
    },

    //box-shadow
    boxShadowUpdate(resultId) {
        target.style.boxShadow = get.boxShadow
        document.getElementById(resultId).innerHTML = 'box-shadow: ' + get.boxShadow
    },
    boxShadowInset(newValue, resultId) {
        get.boxShadowInset = newValue ? 'inset' : ''
        this.boxShadowUpdate(resultId)
    },
    boxShadowOffsetX(newValue, resultId) {
        get.boxShadowOffsetX = newValue
        this.boxShadowUpdate(resultId)
    },
    boxShadowOffsetY(newValue, resultId) {
        get.boxShadowOffsetY = newValue
        this.boxShadowUpdate(resultId)
    },
    boxShadowBlur(newValue, resultId) {
        get.boxShadowBlur = newValue
        this.boxShadowUpdate(resultId)
    },
    boxShadowSpread(newValue, resultId) {
        get.boxShadowSpread = newValue
        this.boxShadowUpdate(resultId)
    },
    boxShadowColor(newValue, resultId) {
        get.boxShadowColor = newValue
        this.boxShadowUpdate(resultId)
    },
}

//debug sreen size
document.addEventListener('DOMContentLoaded', function (e) {
    window.onresize = function () {
        showWindowSize()
    }
})
const scrSize = document.getElementById('screen-size')
function showWindowSize() {
    scrSize.innerHTML = document.documentElement.scrollWidth
}

//Loading image
const imgInput = document.getElementById('input-file')
const imgOutput = document.getElementById('outImage')

const OnLoaded = function (evt) {
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
const toToggleNav = function (isChecked) {
    if (isChecked) {
        nav.className += ' open'
        navToggle.className += ' open'
    } else {
        nav.className = nav.className.replace('open', '')
        navToggle.className = navToggle.className.replace('open', '')
    }
}

const hideElement = function (elementId) {
    document.getElementById(elementId)
}

Object.defineProperty(String.prototype, 'prop', {
    get() {
        return this
    },
})
