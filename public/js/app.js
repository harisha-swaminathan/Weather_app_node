

const weather_form=document.querySelector('form')
const search_value=document.querySelector('input')
const firstPara=document.querySelector('#first')
const secondPara=document.querySelector('#second')




weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search_value.value
    firstPara.textContent='Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            secondPara.textContent=data.error
            firstPara.textContent=''
        }
        else{
            secondPara.textContent=`${data.Location}: ${data.forecast}`
            firstPara.textContent=''
        }
        
    })
})
})