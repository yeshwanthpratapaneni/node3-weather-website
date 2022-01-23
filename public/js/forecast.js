import request from 'request'

const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=42c94fafca1c4b01b2f144554221801&q='+lattitude+','+longitude+'&aqi=no'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service")
        } else if (body.error) {
            callback(body.error.message)
        } else {
            // console.log("Outside temperature ", response.body.current.temp_c)
            // console.log("Feels like ", response.body.current.feelslike_c)

            callback(undefined, {
                temperature : body.current.temp_c,
                feelsLike : body.current.feelslike_c
            })
        }
    })
}

export {forecast}