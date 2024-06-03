import "./App.css";
import reactLogo from "./assets/react.svg";
import { ContainerPages } from "./pages/ContainerPages";

function App() {
  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1 className="text-3xl font-bold underline">SGE 2.0</h1>

      <ContainerPages />
    </>
  );
}

export default App;
