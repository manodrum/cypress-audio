import logo from './logo.svg';
import './App.css';

function App() {

  async function playAudio() {
    const context = new AudioContext({
      latencyHint: "interactive",
      sampleRate: 44100,
    })
    let data = await (await fetch("http://localhost:8080/ui_testing.wav")).arrayBuffer()
    console.log("data: ", data)
    let buffer = await context.decodeAudioData(data)
    const bs = context.createBufferSource()
    bs.buffer = buffer
    bs.connect(context.destination)
    bs.start(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={async () => {await playAudio()} }>Play Audio</button>
      </header>
    </div>
  );
}

export default App;
