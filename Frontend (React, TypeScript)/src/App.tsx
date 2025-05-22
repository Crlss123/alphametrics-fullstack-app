import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
