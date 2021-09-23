import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.get("/api").then((res) => {
      console.log(res.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello------</h1>
    </div>
  );
}

export default App;
