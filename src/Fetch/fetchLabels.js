import { getLocalStorage } from "../helper/localStorage";
const labelArray=[]

export const getLabel = async (style, setLabels) => {
  let alreadyExists= getLocalStorage(style) 
  if (alreadyExists) {
    let savedResult= localStorage.getItem('myLabels')
    savedResult= JSON.parse(savedResult)
      for (let i=0; i<savedResult.length; i++) {
      if(savedResult[i].labelName===style){
        setLabels(savedResult[i].resultArray)
        return 
      }
    }
  }
  fetch(`https://tf-image-classification-server.herokuapp.com/fetchLabels?labelsType=${style}`,{
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token',
    }
  }).then((response) =>{ //make predictions
  if(response.ok){
    return response.json()
  }
  }).then(data =>{ 
    setLabels(data.labels)
    let currentLabel={'labelName': style,'resultArray': data.labels}
    labelArray.push(currentLabel)
    localStorage.setItem('myLabels', JSON.stringify(labelArray))
    getLocalStorage(style)
  }).catch((error) =>{
    setLabels(['Loading..'])
  })
}