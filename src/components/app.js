import React from "react";
import Awards from "./awards/awards";
import Header from "./header/header";
import '../css/styles.css';

const App = () => {

  return (
    <div className="wrapperDiv"> 
      <Header />
      <Awards />
    </div>
  );

}

export default App;
