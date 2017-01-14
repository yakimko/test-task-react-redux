import React from 'react';

import styles from './App.css';

const App = ({ children }) => (
    <section className={styles.root}>
        { children }
    </section>
);

App.propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string
};

export default App;
