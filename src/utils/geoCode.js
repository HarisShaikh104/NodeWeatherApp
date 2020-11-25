const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFzaGJlYm9wIiwiYSI6ImNraGdiMDc0dzAxeG4ycnA2ZTN2bDZ1eGgifQ.L5fp5BLfK7hbYLJKAEXqIw&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Can`t reach Geocode servers.', undefined)
        }
        else if (body.features.length == 0) {
            callback('No Matches Found.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })

        }
    })
}


module.exports = geoCode