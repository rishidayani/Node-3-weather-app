const request = require('postman-request')

const forecast = (latitude , longitude , callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8108330484ed1b2f5d10cca4418ad5ba&query=${latitude},${longitude}`

    request({url , json: true}, (error,response) => {
        if (error) {
            callback(`Unable to connect to weather service!` , undefined)
        } else if ( response.body.error) {
            callback(`Unable to process data`, undefined)
        } else {
            callback(undefined ,`It is currently ${response.body.current.temperature} degree out. It feels like ${response.body.current.feelslike} degrees out` )
        }
    })
}

module.exports = forecast