'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let userName;
let pin;
let currentAccount;
let sorted = false;

(function () {
  accounts.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(e => e.slice(0, 1))
      .join('');
  });
})();

// display dates
const now = new Date();
const day = `${now.getDay()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hours = now.getHours();
const mins = now.getMinutes();
const dateString = `${day}/${month}/${year}, ${hours}:${mins}`;
labelDate.textContent = dateString;

const updateUi = function (account) {
  displayMovements(account);
  displayCalcPrintBalance(account);
  calcDisplaySummary(account);
};

const displayMovements = function (account, sort = false) {
  let movements = account.movements;
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const currentDate = account.movementsDates[i];

    // calculate Date
    const now = new Date(currentDate);
    const day = `${now.getDay()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movement}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayCalcPrintBalance = function (account) {
  const movements = account?.movements;
  const balance = movements.reduce((acc, movement) => {
    return (acc += movement);
  }, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  // calclulate income
  const income = movements
    .filter(movement => movement > 0)
    .reduce((acc, movement) => (acc += movement), 0);
  labelSumIn.textContent = `${income}€`;

  // calclulate outcome
  const outcome = movements
    .filter(movement => movement < 0)
    .reduce((acc, movement) => (acc += movement), 0);
  labelSumOut.textContent = `${Math.abs(outcome)}€`;

  // calclulate intrest
  const intrest = movements
    .filter(movement => movement > 0)
    .map(movement => {
      return movement * (account.interestRate / 100);
    })
    .filter(intrest => {
      return intrest >= 1;
    })
    .reduce((acc, int, _, intrest) => {
      return (acc += int);
    }, 0);
  labelSumInterest.textContent = `${intrest} €`;
};

const getUserAccount = function (userName) {
  return accounts.find(account => {
    return account.userName === userName;
  });
};

// login feature
btnLogin.addEventListener('click', e => {
  e.preventDefault(); // to prevent reload
  userName = inputLoginUsername.value;
  pin = inputLoginPin.value;
  currentAccount = getUserAccount(userName);
  if (currentAccount?.pin === parseInt(pin)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = '1'; // display UI
    //clear input and blur cursor
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    // display movements
    updateUi(currentAccount);
  } else {
    console.log('unauthorized user');
  }
});

/** CLose account */
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccountOwner = inputTransferTo.value;
  const receiverAccount = getUserAccount(receiverAccountOwner);
  if (
    receiverAccount &&
    amount > 0 &&
    currentAccount.balance > amount &&
    receiverAccount?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    // UI Change
    updateUi(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  } else {
    console.log('invalid transfer');
  }
});

/** Request loan */
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(movement => {
      return movement >= loanAmount * 0.1;
    })
  ) {
    currentAccount.movements.push(loanAmount);
    updateUi(currentAccount);
    inputLoanAmount.value = '';
  } else {
    console.log('loan amount not sanctioned');
  }
});

/** Close account */
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // find index for current account
    const index = accounts.findIndex(acc => {
      return acc.userName === currentAccount.userName;
    });
    // delete account
    accounts.splice(index, 1);
    // hide UI
    containerApp.style.opacity = '0'; // display UI
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

/** sort feature */
btnSort.addEventListener('click', e => {
  sorted = !sorted;
  e.preventDefault();
  displayMovements(currentAccount, sorted);
});

// fake always logged-in
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 1;
