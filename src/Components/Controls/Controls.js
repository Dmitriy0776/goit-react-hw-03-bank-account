import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const Controls = ({ input, onChangeInput, onClikDepSub, onClikWithSub }) => {
  return (
    <section className={styles.controls}>
      <input
        className={styles.controls_input}
        type="number"
        value={input}
        name="inputValue"
        onChange={onChangeInput}
      />
      <button
        className={styles.controls_buttonDeposit}
        type="button"
        onClick={onClikDepSub}
      >
        Deposit
      </button>
      <button
        className={styles.controls_button}
        type="button"
        onClick={onClikWithSub}
      >
        Withdraw
      </button>
    </section>
  );
};

Controls.propTypes = {
  input: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onClikDepSub: PropTypes.func.isRequired,
  onClikWithSub: PropTypes.func.isRequired,
};

export default Controls;
