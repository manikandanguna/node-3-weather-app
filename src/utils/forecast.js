const request = require('request')
const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=578dfd7310674e077815e9ef4c3c098a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect weather server ! ', undefined)
        } else if (body.error) {
            callback('unable to find location ! ', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ' it is currently ' + body.current.temperature + ' degree out. and its feel like ' + body.current.feelslike + ' degree out and the humidity is ' + body.current.humidity
            )

        }
    })
}

module.exports = forecast
