"use strict";

const App = () => {
  return <h1>Hello world</h1>;
};

const root = document.getElementById("root");

const e = React.createElement;

ReactDOM.render(e(App), root);
