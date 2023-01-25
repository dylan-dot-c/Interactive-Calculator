// DOM ELEMENTS
const buttons = document.querySelectorAll('button')
const expression = document.querySelector('#expression')
const result = document.querySelector('#answer')
const checkbox = document.querySelector('#mode')
const historyContanier = document.querySelector('#history')
const showHistory = document.querySelector('#showHistory')
const history = [];


showHistory.addEventListener('click', () => {
    if(historyContanier.style.display == 'none') {
        historyContanier.style.display = 'flex'
    } else {
        historyContanier.style.display = 'none'
    }
})

checkbox.addEventListener('change', (e) => {
    if(e.currentTarget.checked) {
        document.documentElement.setAttribute('data-theme', "dark")
    } else {
        document.documentElement.setAttribute('data-theme', "light")
    }
})

console.log(history)

buttons.forEach( btn => {
    console.log(btn.dataset.input)
})

function insert(char){
    if(['+', '-', '*', '/'].includes(char)) {
        if( ['+', '-', '*', '/'].includes( expression.value.slice(-1) )) {
            remove()
        }
        
    }
    expression.value += char
    answer.value = eval(expression.value)
}

function empty(){
    expression.value = ''
    result.value = ''
    console.log('clear')
    console.log(expression.value)
}

function calc() {
    historyContanier.innerHTML = ''
    console.log(history)
    let expreVal = expression.value
    expression.value = eval(expression.value)
    history.push({ 
        expression: expreVal, 
        answer: answer.value,
    }
    )

    localStorage.setItem('history', JSON.stringify(history))
    let info = ''
    history.forEach( (result, index) => {
        
        let output = document.createElement('div')
        output.dataset.index = index
        // destructing
        const {expression, answer} = result
        output.innerHTML =  `<h3 data-index=${index}>${expression}</h3>
        <p data-index=${index} >${answer}</p>`
        output.className = 'history--output'

        // output.class

        
        historyContanier.append(output)
    })

    let histories = document.querySelectorAll('.history--output')
    console.log(histories)
    histories.forEach( his => {
        his.addEventListener('click', (e) => {
            e.stopPropagation()
            // alert("TOUCHED!")
            console.log(e.target)
            console.log('data is ', e.target.getAttribute('data-index'))
            console.log(history[0])

            let num = e.target.getAttribute('data-index')
            result.value = `${history[num].answer}`
            expression.value = `${history[num].expression}`
        })
    })
    
}

function remove() {
    let str = expression.value
    str = str.slice(0, -1)
    expression.value = str
    answer.value = eval(expression.value)
    // alert(str)
}
    
