import React from 'react';
import Buttons from './Buttons';
import History from './History';
import Display from './Display';
import * as Calculator from '../core-functions';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: [],
      history: [],
      input: '0',
      isShowHistory: false,
      afterCalculation: false
    }

    this.onDigit = this.onDigit.bind(this);
    this.onOperator = this.onOperator.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onClearEntry = this.onClearEntry.bind(this);
    this.onEqual = this.onEqual.bind(this);
    this.onDecimal = this.onDecimal.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
    this.onHistory = this.onHistory.bind(this);
    this.onHistoryItemClicked = this.onHistoryItemClicked.bind(this);
    this.onClearHistory = this.onClearHistory.bind(this);
    this.onPositiveNegative = this.onPositiveNegative.bind(this);
    this.onSquareRoot = this.onSquareRoot.bind(this);
    this.onSquare = this.onSquare.bind(this);
    this.onOneOverX = this.onOneOverX.bind(this);

  }

  onDigit({ target }) {
    const digit = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: digit,
        afterCalculation: false
      });
    } else if (input === '0') {
      this.setState({
        input: digit
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: digit,
        formula: this.state.formula.concat(input)
      });
    } else {
      this.setState({
        input: input.concat(digit)
      });
    }
  }

  onDecimal({ target }) {
    const decimal = target.innerText;
    const input = this.state.input;

    if (this.state.afterCalculation) {
      this.setState({
        input: `0${decimal}`,
        afterCalculation: false
      });
    } else if (Calculator.isNotNumber(input)) {
      this.setState({
        input: `0${decimal}`,
        formula: this.state.formula.concat(input)
      });
    } else if (!input.includes(decimal)) {
      this.setState({
        input: input.concat(decimal),
      });
    }
  }

  onOperator({ target }) {
    let operator = target.innerText;
    const input = this.state.input;

    if (operator === 'X') operator = '*';
    else if (operator === '÷') operator = '/';

    if (Calculator.isOperator(input)) {
      this.setState({
        input: operator,
        afterCalculation: false
      });
    } else {
      this.setState({
        formula: this.state.formula.concat(this.state.input),
        input: operator,
        afterCalculation: false
      });
    }
  }

  onPositiveNegative () {
    const input = this.state.input;    
    let result =  input;
    let formula = this.state.formula;

    if (Calculator.isNumber(input)) {
      if(result.includes('-')){
        result = result.replace('-','');
      } else {
        result = '-'.concat(input);
      }

      if ( formula.length > 0 ){
        let lastEntry = formula[formula.length - 1];

        if( lastEntry[lastEntry.length - 1] !== ")" ){
          formula = formula.concat("("+result+")");
        } else {

          formula.forEach(item => {
            if ( item.includes("(") ) {

              formula = formula.filter(e => e !== lastEntry);
              formula = formula.concat("("+result+")");
            }
          });

        }
      } else {
        formula = [];
      }
  }

    this.setState({
      input: result,
      formula: formula,
      afterCalculation: false
    });
  }

  onSquareRoot () {
    let finalFormula = this.state.formula.concat(this.state.input);
    let squareRootSymbol = '√';
    const result = Math.sqrt(this.state.input);

    const newHistoryItem = {
      formula: squareRootSymbol.concat(finalFormula),
      result: result
    }

    this.setState({
      input: result + "",
      formula: [],
      history: [].concat(newHistoryItem, this.state.history),
      afterCalculation: true
    });

  }

  onSquare () {
    let finalFormula = this.state.formula.concat(this.state.input);
    const result = Math.pow(this.state.input, 2);

    const newHistoryItem = {
      formula: finalFormula.concat(" ^ 2"),
      result: result
    }

    this.setState({
      input: result + "",
      formula: [],
      history: [].concat(newHistoryItem, this.state.history),
      afterCalculation: true
    });
  }

  onOneOverX () {
    let finalFormula = this.state.formula.concat(this.state.input);
    const result = 1 / this.state.input;

    const newHistoryItem = {
      formula: "1 / ".concat(finalFormula),
      result: result
    }

    this.setState({
      input: result + "",
      formula: [],
      history: [].concat(newHistoryItem, this.state.history),
      afterCalculation: true
    });

  }

  onClear() {
    this.setState({
      formula: [],
      input: '0',
      afterCalculation: false
    });
  }

  onClearEntry() {
    this.setState({
      input: '0',
      afterCalculation: false
    });
  }

  onBackspace() {
    const input = this.state.input;
    const formula = this.state.formula;
    const currentInputLength = input.length;

    if (input === 'Infinity' || input === '-Infinity' || input === 'NaN') {
      this.setState({
        input: '0',
        afterCalculation: false
      });
    } else if (currentInputLength > 1) {
      this.setState({
        input: input.slice(0, currentInputLength - 1),
        afterCalculation: false
      });
    } else if (input !== '0') {
      this.setState({
        input: '0',
        afterCalculation: false
      });
    } else if (formula.length > 0) {
      this.setState({
        input: formula[formula.length - 1],
        formula: formula.slice(0, formula.length - 1),
        afterCalculation: false
      });
    }
  }

  onEqual() {

    let finalFormula = this.state.formula.concat(this.state.input);

    finalFormula.forEach(item => {
      if ( item.includes("(") ) {
        finalFormula = finalFormula.filter(e => e !== item); 
      }
    });

    const result = Calculator.evaluate(finalFormula);

    if (!Number.isNaN(result)) {
      const newHistoryItem = {
        formula: finalFormula,
        result: result
      }

      this.setState({
        input: result + "",
        formula: [],
        history: [].concat(newHistoryItem, this.state.history),
        afterCalculation: true
      });
    }
  }

  onHistory() {
    this.setState({
      isShowHistory: !this.state.isShowHistory
    });
  }

  onClearHistory() {
    this.setState({
      history: []
    });
  }

  onHistoryItemClicked({ target }) {
    const number = target.getAttribute("value");
    const input = this.state.input;

    if (Calculator.isNumber(input)) {
      this.setState({
        input: number
      });
    } else {
      this.setState({
        input: number,
        formula: this.state.formula.concat(input)
      });
    }
  }

  render() {
    return (
      <div>
        <div className="calculator">
          <Display
            formula={this.state.formula}
            input={this.state.input}
            onHistory={this.onHistory}
            isShowHistory={this.state.isShowHistory}
          />

          <Buttons
            onClear={this.onClear}
            onClearEntry={this.onClearEntry}
            onEqual={this.onEqual}
            onDecimal={this.onDecimal}
            onDigit={this.onDigit}
            onOperator={this.onOperator}
            onBackspace={this.onBackspace}
            onPositiveNegative={this.onPositiveNegative}
            onSquareRoot={this.onSquareRoot}
            onSquare={this.onSquare}
            onOneOverX={this.onOneOverX}
          />

          <History
            isShowHistory={this.state.isShowHistory}
            history={this.state.history}
            onHistoryItemClicked={this.onHistoryItemClicked}
            onEqual={this.onEqual}
            onClearHistory={this.onClearHistory}
          />
        </div> 
      </div>
    )
  }
}

export default App;