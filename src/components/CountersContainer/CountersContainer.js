import React from 'react';
import PropTypes from 'prop-types';
import styles from './CountersContainer.module.css';


const CountersContainer = ({ children }) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

CountersContainer.propTypes = {
    children: PropTypes.node
};

export default CountersContainer;