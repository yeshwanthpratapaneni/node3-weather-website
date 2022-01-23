import request from 'request'
import chalk from 'chalk'

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWVzaHdhbnRoZW5hdG9yIiwiYSI6ImNreWtjdzJ1ZjBjcGoyb3BuOWRjZmFtNTIifQ.pcyOMdQ-cKXlTL2EHLBLaA'
    request({ url , json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to Map service")
        } else if (body.features.length === 0) {
            callback(chalk.red.bold('Not a valid place'))
        } else {
            //         console.log('Lattitude: ' + response.body.features[0].center[1])
            //         console.log('Longtitude: ' + response.body.features[0].center[0])
            callback(undefined, {
                lattitude : body.features[0].center[1],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

export {geocode}