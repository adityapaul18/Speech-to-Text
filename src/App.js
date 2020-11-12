import React ,{useState , useEffect} from 'react';
import './App.css';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';

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
        console.log('recording stopped')
      }
    }
    mic.onstart = () => {
      console.log('recording started')
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

    <div className="App">
    <div className="app_name">Voice Notes</div>
      <div className="voice_box">
         <h2>Recording Section</h2>
               {isListening ? <MicIcon/> : <MicOffIcon/>}
         <div className="vb_inner">
               <button onClick={handleSaveNote} disabled ={!note}>Print </button>
               <button onClick={() => setisListening(prevState => !prevState)}>Record</button>
         </div>
      <p className="notes">{note}</p>
      </div>
      <div className="notes_box">
         <h2>Notes Obtained</h2>
         <div className="saved_notes">
         {savednotes.map(n => (
           <p key={n}>{n}</p>
           ))}
         </div>
      </div>
      <div className="bellow"></div>
      </div>
    </>
  );
}

export default App;
