import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const Balance = ({ amountDeposit, amountWithdraw, amountBalance }) => {
  return (
    <section className={styles.balance}>
      <span className={styles.arrowUp}>⬆{amountDeposit}</span>
      <span className={styles.arrowDown}>⬇{amountWithdraw}</span>
      <span>Balance: {amountBalance}$</span>
    </section>
  );
};
Balance.defaultProps = {
  amountDeposit: 0,
  amountWithdraw: 0,
  amountBalance: 0,
};
Balance.propTypes = {
  amountDeposit: PropTypes.number,
  amountWithdraw: PropTypes.number,
  amountBalance: PropTypes.number,
};
export default Balance;
