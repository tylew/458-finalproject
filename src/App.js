import './App.css';
import ScriptTag from 'react-script-tag';
import { useStickyState } from "./hooks/useStickyState";
import TextBox from './TextBox';
import data from './descriptions.json';


export default function App() {
  const [state, setState] = useStickyState(1, "sketchstate");

  const numStates = 5;

  // Logic to cycle states
  function changeState(direction) {
    if (direction === -1){
      if (state <= 1) {
        setState(numStates);
      } else {
        setState(state - 1);
      }
    } else if (direction === 1){
      if (state >= numStates) {
        setState(1);
      } else {
        setState(state + 1);
      }
    }
    
  }

  if (state === 1){
    document.title = "SCENES";
  } else {
    document.title = "SCENE " + state;
  }
  

  return (
    <div className="App">
      
      <ScriptTag type="text/javascript" src="p5/sketch.js" />
      
      <div className="gui">

        {/* Back Button */}
        <div className="btn btnL" onClick={() => changeState(-1)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </div>

        <TextBox data={data} sceneNum={state}></TextBox>

        {/* Forward Button */}
        <div className="btn btnR" onClick={() => changeState(1)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        

      </div>
    </div>
  );
}

