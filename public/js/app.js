

const weather_form=document.querySelector('form')
const search_value=document.querySelector('input')
const firstPara=document.querySelector('#first')
const secondPara=document.querySelector('#second')




weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search_value.value
    firstPara.textContent='Loading...'
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            firstPara.textContent=''
            secondPara.textContent=data.error 
        }
        else{

            firstPara.textContent=`${data.Location}`
            secondPara.textContent=`${data.forecast}`
        }
        
    })
})
})