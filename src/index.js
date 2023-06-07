import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';


// skc chunk
let btn = document.createElement("button");
btn.innerHTML = "click me";
document.body.appendChild(btn);

async function getAsyncComponent() {
  var element = document.createElement('div');
  const { test } = await import('./skc-test');

  element.innerHTML = test()

  return element;
}

btn.addEventListener('click', () => {
  getAsyncComponent().then(component => {
      document.body.appendChild(component);
  })
})

//  skc ---chunk end

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('container')
);
