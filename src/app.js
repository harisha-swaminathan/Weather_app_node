const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()

const port= process.env.PORT ||3000
//changing viewpath location

const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//set up static directory to serve
app.use(express.static(path.join(__dirname,'../public/')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Harisha Rajam Swaminathan'
    })
})
app.get('/about',(req,resp)=>{

    resp.render('about',{
        title:' About Page',
        name:'Harisha Rajam Swaminathan'
    })

})
app.get('/help',(req,res)=>{

    res.render('help',{
        title:'Help Page',
        name:'Harisha Rajam Swaminathan'
    })

})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
       return  res.send({
            error:'Please enter an address'
        })
    }
    geocode(address,(error,{latitude, longitude, place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecast:forecastData.forecast,
                Location:place,
                address
            })
        })
    })
    
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Error: Help article not found',
        name:'Harisha Rajam Swaminathan'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 error: Page not found',
        name:'Harisha Rajam Swaminathan'
    })
})


app.listen(port,()=>{
    console.log('Started')
})


