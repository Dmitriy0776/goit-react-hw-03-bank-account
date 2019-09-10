import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import 'react-toastify/dist/ReactToastify.css';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    inputValue: '',
    deposit: 0,
    withdraw: 0,
  };

  componentDidMount() {
    try {
      const getBankInfo = localStorage.getItem('bankInfo');

      if (getBankInfo !== null) {
        const newPartState = JSON.parse(getBankInfo);

        this.setState({ ...newPartState });
      }
    } catch (err) {
      throw ('err :', err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance, deposit, withdraw } = this.state;

    if (prevState.transactions !== transactions) {
      localStorage.setItem(
        'bankInfo',
        JSON.stringify({ transactions, balance, deposit, withdraw }),
      );
    }
  }

  notifyA = () =>
    toast('На счету недостаточно средств для проведения операции!');

  notifyB = () => toast('Введите сумму для проведения операции!');

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDepositSubmit = () => {
    const { inputValue } = this.state;

    const transactionData = new Date().toLocaleString('en-GB');

    const newDeposit = {
      id: shortid.generate(),
      type: 'Withdrawal',
      amount: Number(inputValue),
      date: transactionData,
    };
    if (Number(inputValue) === 0 || Number(inputValue) === ' ') {
      this.notifyB();
    } else {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newDeposit],
        balance: prevState.balance + Number(inputValue),
        deposit: prevState.deposit + Number(inputValue),
        inputValue: '',
      }));
    }
  };

  handleWithdrawSubmit = () => {
    const { inputValue, balance } = this.state;

    const transactionData = new Date().toLocaleString('en-GB');

    const newWithdraw = {
      id: shortid.generate(),
      type: 'Withdrawal',
      amount: Number(inputValue),
      date: transactionData,
    };
    if (Number(inputValue) > balance) {
      this.notifyA();
    } else if (Number(inputValue) === 0 || Number(inputValue) === ' ') {
      this.notifyB();
    } else {
      this.setState(prevState => ({
        transactions: [...prevState.transactions, newWithdraw],
        balance: prevState.balance - Number(inputValue),
        withdraw: prevState.withdraw + Number(inputValue),
        inputValue: '',
      }));
    }
  };

  render() {
    const { transactions, inputValue, balance, deposit, withdraw } = this.state;
    return (
      <div>
        <Controls
          input={inputValue}
          onChangeInput={this.handleChangeInput}
          onClikDepSub={this.handleDepositSubmit}
          onClikWithSub={this.handleWithdrawSubmit}
        />
        <Balance
          amountDeposit={deposit}
          amountWithdraw={withdraw}
          amountBalance={balance}
        />
        <TransactionHistory transactionArr={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
