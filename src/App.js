import React ,{useState , useEffect} from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {

  const [isListening,setisListening] = useState(false);
  const [note,setNote] = useState(null);
  const [savednotes,setSavednotes] = useState([]);

  useEffect(() => {
    handlelisten()
  },[isListening])


  const handlelisten = () => {
    if(isListening){
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    }

    else{
      mic.stop()
      mic.onend = () => {
        console.log('mic stop')
      }
    }
    mic.onstart = () => {
      console.log('mic on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')

      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavednotes([...savednotes, note])
    setNote('')
  }

  return (
    <>
    <h1>Voice Notes</h1>

    <div className="App">
      <div className="box">
         <h2>current box</h2>
         {isListening ? <span>mic on</span> : <span> mic off</span>}
         <button onClick={handleSaveNote} disabled ={!note}>Save Note </button>
         <button onClick={() => setisListening(prevState => !prevState)}>Start/Stop</button>
      <p>{note}</p>
      </div>
      <div className="box">
         <h2>Notes Obtained</h2>
         {savednotes.map(n => (
           <p key={n}>{n}</p>
         ))}
      </div>
    </div>
    </>
  );
}

export default App;
