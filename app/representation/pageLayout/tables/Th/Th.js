import React from 'react';
import classNames from 'classnames';

import styles from './Th.css';

const Th = ({ children, className, order, ...args }) => {
    return (
        <th className={ classNames(styles.Th, className) } { ...args }>
            <i className={ classNames(styles.icon, {
                [styles.sort]: order === 'sort',
                [styles.desc]: order === 'desc',
                [styles.asc]: order === 'asc'
            }) }> </i>
            { children }
        </th>
    );
};

Th.propTypes = {
    className: React.PropTypes.string,
    order: React.PropTypes.string
};

export default Th;
