const request = require('request')
const forecast = (longitude, latitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=578dfd7310674e077815e9ef4c3c098a&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect weather server ! ', undefined)
        } else if (body.error) {
            callback('unable to find location ! ', undefined)
        }
        else {
            callback(undefined,' it is currently '+body.current.temperature +' degreey and climate out there is ' + body.current.weather_descriptions[0]
            )
            
        }
    })
}

module.exports = forecast
