const weatherForm = document.querySelector('form')
const searchLoc = document.querySelector('input')
const errorMsg = document.querySelector('#errorMsg')
const successMsg = document.querySelector('#successMsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    errorMsg.textContent = 'Loading Forecast..'
    successMsg.textContent = ''
    fetch('/weather?address=' + searchLoc.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMsg.textContent = data.error
            }
            else {
                successMsg.textContent = data.location
                errorMsg.textContent = data.forecast
            }
        })
    })
})