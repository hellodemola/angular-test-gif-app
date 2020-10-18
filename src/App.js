import React, {useState, useEffect} from 'react';
import {Col, Row, Container} from 'react-bootstrap'
import {Pane} from 'evergreen-ui'
import './main.css'
import './custom.css'
import Axios from 'axios';


function App() {

// using React function UseState to manage state 
const [giphy, setGiphy] = useState(false)
const [searchItem, setSearchItem] = useState()
const [dataGiphy, setData] = useState([])
const [singleGif, setSingleGif] = useState()
const [singleView, setSingleView] = useState(false)
const [isLoading, setIsLoading] = useState(false)

// Handle finder function
async function HandleSubmit (e) {
  e.preventDefault();
  setIsLoading(true)
  setGiphy(false)
  try{  
  const response = await Axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchItem}&api_key=7SVgiay9MnyNJn3NIBjlaUfa12WW4iHr&limit=24`)

  if(response.data){ 
   let responseData = JSON.stringify(response.data.data)
   localStorage.setItem('gif', responseData)
   setGiphy(true)
   setIsLoading(false)
  }
}
catch(err){
  console.log(err)
  setIsLoading(false)
}

}

function getGif(e) {
  // e.preventDefault();
  let selectGif =   
  dataGiphy.filter((i) => {
    return i.id === e;
  })
  console.log(selectGif);
  setSingleGif(selectGif[0])
  let responseData = JSON.stringify(selectGif)
  localStorage.setItem('SingleGif', responseData)
  setGiphy(false)
  setSingleView(true)
}

function HandleBack () {
  setSingleView(false)
  setGiphy(true)
}


useEffect(() => {
 if (giphy){

  function saveData () {
    if (giphy) { 
    localStorage.getItem('gif')
    setData(JSON.parse(localStorage.getItem('gif')))
  } else {
    localStorage.removeItem('gif')
  }
}
  return saveData()
 }

}, [giphy])



  return (
    <div className="App" style={{paddingTop: '3em' }}>
      <header className="App-header">
      <Container>
        <Row className='justify-content-center'>
          <Col md={7}>
          <form onSubmit={HandleSubmit}> 
         
        <h4 className='text-center'>GIPHY finder | hello demola </h4>
        <hr/>
       
        { singleView ? ( <button className='btn btn-danger' onClick={HandleBack}> &larr; Get Back  </button> ) : 
        ( 
          <Row>
          <Col md={9}> <input onChange={e => setSearchItem(e.target.value)} name='searchItem' className='form-control' required type='text' placeholder='search' /></Col>
          <Col md={3}>
          {isLoading ? ( <button className='btn btn-default' disabled='disable' type='submit'> Loading...</button>) : 
          (
            <button className='btn btn-primary' type='submit'>Find &rarr;</button>
          )}
          
          </Col>
          </Row>
        )}
   
      
       
       </form>
       <br/>

          </Col>
        </Row>

            
        {giphy ? (

         <Row>
        
         {dataGiphy.map( (gif, index) => {
            return (
              <Col key={gif.id} md={3}> 
           
              <a onClick={() => getGif(gif.id)}>       
              <Pane elevation={2} style={{marginTop: '1em'}}>
                <img 
                src={gif.images.downsized.url} 
                alt={gif.slug}   
                width='250'           
                height='200'           
                />
              </Pane>
              </a>
              
              </Col>
            )
            
         }) }
         </Row>
    
       ) : '' }

       {singleView ? (
         <>
        <Row className='justify-content-center'>
          <Col md={4}>
            <Pane>
            <img 
                src={singleGif.images.downsized.url} 
                alt='yes'   
                width='100%'           
                />
            </Pane>
          </Col>
          <Col md={7}>
          <div className='border' style={{padding: '1em'}}>
          <table className='table'>
          <tbody>
              <tr>
              <th>id</th>
              <th>{singleGif.id}</th>
              </tr>
              <tr>
              <th scope="row">Tittle</th>
              <th scope="row">{singleGif.title}</th>
              </tr>
              <tr>
              <th scope="row">Import Date:</th>
              <th scope="row">{singleGif.import_datetime}</th>
              </tr>
              <tr>
              <th scope="row">URL:</th>
              <th scope="row"><a href={singleGif.url} target='_blank'>Link &rarr;</a></th>
              </tr>
              <tr>
              <th scope="row">embed_url:</th>
              <th scope="row">{singleGif.embed_url}</th>
              </tr>
              <tr>
              <th scope="row">Rating:</th>
              <th scope="row"><span className='text-uppercase'>{singleGif.rating}</span></th>
              </tr>
            </tbody>
          </table>
        
          
         
          </div>

          
          </Col>
        </Row>
        
         
          
         </>
       ) : ''}
        
       
      </Container>
 
      </header>
    </div>
  );
}

export default App;
