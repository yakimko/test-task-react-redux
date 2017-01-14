import React from 'react';

import Users from '../../containers/Users';

import styles from './ScreenUsers.css';

export default props => (
    <section className={ styles.root }>
        <Users {...props} />
    </section>
);
