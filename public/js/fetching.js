console.log('loading client side java script')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        message1.textContent = data.location
        message2.textContent = data.temperature +' '+ data.feelsLike
        console.log(data)
    })
})
})