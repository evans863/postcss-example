import React from 'react';

import styles from './ModuleTwo.css';

export default class ModuleTwo extends React.Component {
  render() {
    return(
      <div className={styles.moduleTwo}>
        <h2 className={styles.moduleTwoHeading}>Module two heading - should be blue</h2>
      </div>
    );
  }
}

