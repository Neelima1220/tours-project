import React from 'react';
import './style.css';
import chalk from 'chalk';
// const chalk = require('chalk');
export default function App() {
  console.log(chalk.blue('Hello world!'));
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
