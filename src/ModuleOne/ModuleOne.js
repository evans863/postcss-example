import React from 'react';

import styles from './ModuleOne.css';

export default class ModuleOne extends React.Component {
  render() {
    return(
      <div className={styles.moduleOne}>
        <h2 className={styles.moduleOneHeading}>Module one heading - should be red</h2>
      </div>
    );
  }
}
