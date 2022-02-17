const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ3VuYTE3MTAiLCJhIjoiY2t6NWtvZmd4MDM5bzMwbWcwMzFmbWFhOCJ9.-Gm0N-LYCKbOuP66n_-6rw&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect geocoding server..!', undefined)

        } else if (!body.features[0]) {
            callback('unable to find Location.,Please try another one.', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode