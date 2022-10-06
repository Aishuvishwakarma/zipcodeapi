import React,{useState,useEffect} from 'react'

import axios from 'axios'

export default function App() {


  // https://app.zipcodebase.com/api/v1/country/province?apikey=YOUR-APIKEY&country=de


  const [state, setstate] = useState({country:'in'})

  const [selectState,setselectState] =  useState('')

  const [statearry,setStatearry] = useState([])

  const [city,setCity] = useState([])


  useEffect(()=>{
    let api = `https://app.zipcodebase.com/api/v1/country/province?apikey=94b920d0-42f1-11ed-a129-27762a68f659&country=${state.country}`
   axios.get(api)
  .then((response)=>{
   setStatearry(response.data.results)
  })
  .catch((err)=>console.log(err))
  })


  // if(!selectState==''){
  //   let api = `https://app.zipcodebase.com/api/v1/code/state?apikey=94b920d0-42f1-11ed-a129-27762a68f659&state_name=${selectState}&country=${state.country}`
  
 
  //   axios.get(api)
  //   .then((response)=>{
  //    console.log(response)
  //    // setCity()
  //   })
  //   .catch((err)=>console.log(err))
  
  //  }

const onChangehandler = (e)=>{
  setstate({[e.target.name]:e.target.value})
}



const selectStateHandler = async  (e)=>{
  setselectState(e.target.value)


   let api = `https://app.zipcodebase.com/api/v1/code/state?apikey=94b920d0-42f1-11ed-a129-27762a68f659&state_name=mp&country=${state.country}`


  await axios.get(api)
  .then((response)=>{
    console.log(response)
    setCity(response.data.results)
  })
  .catch(error=>console.log(error,'error'))
  
}

const selectCityHandler = (e)=>{
  setCity(e.target.value)
}

let statelist =  statearry.length ?   statearry.map((v,key)=>{
                      return <option  key={key}>{v}</option>
                      })  :  <option disabled>select state</option>
          

  return (
    <div >
      <input type="text"  placeholder='country name'  />

     <select name='state' onChange={(e)=>selectStateHandler(e)}  >
      {statelist}
     </select>

     <select name='City' onChange={(e)=>selectCityHandler(e)}  >
      {/* {statelist} */}
     </select>

      {/* <button  onClick={()=>getState()} >submit</button> */}
    </div>
  )
}
