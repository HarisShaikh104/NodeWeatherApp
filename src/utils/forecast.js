const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=644d650c0751b683aa0e27c397d1d5dd&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Weather Service.', undefined)
        }
        else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, "It is " + body.current.weather_descriptions[0] + " weather. It is curently " + body.current.temperature + " degrees out. But it feels like " + body.current.feelslike + ".")
        }
    })
}

module.exports = forecast