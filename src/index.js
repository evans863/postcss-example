import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.css';

import ModuleOne from './ModuleOne/ModuleOne';
import ModuleTwo from './ModuleTwo/ModuleTwo';

export default class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Testing mini-css-extract-plugin with postcss</h1>
        <div className={styles.centered}>
          <ModuleOne/>
          <ModuleTwo/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app') 
);
