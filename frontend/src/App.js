// // import './App.css';
// import ChatWidget from './component/ChatWidget';

// import Hero from './component/Hero'

// function App() {
//   return (
//     <div className="main">
//       <Hero/>
//       <ChatWidget/>
//     </div>
//   );
// }

// export default App;
import React from "react";
import "./App.css";
import "./Style.css";

import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import ChatWidget from "./component/ChatWidget";

function App() {
  return (
    <div className="app">
      <div className="background-glow glow-1"></div>
      <div className="background-glow glow-2"></div>

      <Navbar />

      <main>
        <Hero />
      </main>

      <ChatWidget />
    </div>
  );
}

export default App;

