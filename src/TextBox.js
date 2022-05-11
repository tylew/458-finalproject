// import { useStickyState } from "./hooks/useStickyState"

export default function TextBox( {data, sceneNum} ) {
//   const [state, setState] = useStickyState(1, "sketchstate");

  return (
    <div className="TextBoxClass">
      <h1>{data[sceneNum]?.title}</h1>
      <h2>{data[sceneNum]?.description}</h2>
      
    </div>
  );
}

