import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

const [partita, setPartita] = useState(false);
const [risposta,setRisposta]=useState();
const [loading,setLoading] = useState(false);
const [id,setId]=useState();
const[tentativi,setTentativi]=useState(0);
const[numero,setNumero]=useState();
const[input,setInput]=useState("");
const[inserimento,setInserimento]=useState(false);
const[indovinato,setIndovinato]=useState(false);


async function tentativiFunzione(){

  setTentativi(tentativi+1);
  if(numero==input){
    setIndovinato(true);
  }
  else{
    setIndovinato(false);
  }
  

}

async function inizio(){

setLoading(true);
  const response = await fetch("http://localhost:8080/partita", {method: "POST"});
  const answer = await response.json();
  setPartita(false);
  setId(answer.id);
  setNumero(answer.numero);

  
}

async function invioNumero(){

  setLoading(true);
  const response= await fetch("http://localhost:8080/partita",{method:"PUT"});
  const answer=await response.json();
  setLoading(false);
  setTentativi(answer.numero);
  setRisposta(answer.numero);

  

}

  return (
    <div className="App">
      
      <h1>Indovina numero</h1>
      <div> <button onClick={(inizio)}>nuova partita</button> </div>
    
      {partita &&
      
      <div>in caricamento</div>

      }

      {!partita &&
      <>
        <div>
          <p>
            ID:{id}
          </p>
          <p>tentativi:{tentativi}</p>

          <p>numero:{numero}</p>

        {
        indovinato && 

        <p>numero indovinato</p>

        }
        {!indovinato &&

        <p>riprova</p>

        }
        </div>

          <div> 
            <p>inserisci un numero:</p>
            <input type="number"name="numeroTentato"></input> 
            <button onClick={tentativiFunzione}>inserisci</button>

          </div>
                
      </>
      } 
   
    </div>
  );
}

export default App;
