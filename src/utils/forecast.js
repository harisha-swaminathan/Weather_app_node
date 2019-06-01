const request=require('request')
const forecast=(latitude, longitude, callback)=>{
    const url=`https://api.darksky.net/forecast/224ccfe2122fb06dee921b64fd987bae/${latitude},${longitude}`

    request({url, json:true},(error,{body}={})=>{
            if(error){
                callback('Unable to connect to server',undefined)
            }
            else if(!body)
            callback('Unable to find location', undefined)
            else{
                callback(undefined, {
                    forecast:`It is currently ${body.currently.temperature} degrees outside. There is a ${body.currently.precipIntensity}% chance of rain`
                    // temperature:body.currently.temperature,
                    // precipIntensity:body.currently.precipIntensity

               })
            }
    })
}

module.exports=forecast