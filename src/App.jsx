import "./App.css";
import Form from "./components/Form";
import { forms } from "./components/data";

function App() {
  return (
    <div className="main_container">
      <h1>CV Generator</h1>
      <div className="forms">
        <Form formDetails={forms} />
      </div>
    </div>
  );
}

export default App;
