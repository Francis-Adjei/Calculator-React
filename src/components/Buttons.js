import React from 'react';

export default class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button id="modulo" onClick={this.props.onOperator}>%</button>
        <button id="square-root" onClick={this.props.onSquareRoot}>√x</button>
        <button id="square" onClick={this.props.onSquare}>x<sup>2</sup></button>
        <button id="one-over-x" onClick={this.props.onOneOverX}>1/x</button>

        <button id="clear-entry" onClick={this.props.onClearEntry}>CE</button>
        <button id="clear" onClick={this.props.onClear}>C</button>
        <button id="backspace" onClick={this.props.onBackspace}><i className="fas fa-backspace"></i></button>
        <button id="divide" onClick={this.props.onOperator}>÷</button>

        <button id="seven" onClick={this.props.onDigit}>7</button>
        <button id="eight" onClick={this.props.onDigit}>8</button>
        <button id="nine" onClick={this.props.onDigit}>9</button>
        <button id="multiply" onClick={this.props.onOperator}>X</button>

        <button id="four" onClick={this.props.onDigit}>4</button>
        <button id="five" onClick={this.props.onDigit}>5</button>
        <button id="six" onClick={this.props.onDigit}>6</button>
        <button id="subtract" onClick={this.props.onOperator}>-</button>

        <button id="one" onClick={this.props.onDigit}>1</button>
        <button id="two" onClick={this.props.onDigit}>2</button>
        <button id="three" onClick={this.props.onDigit}>3</button>
        <button id="add" onClick={this.props.onOperator}>+</button>

        <button id="positive-negative" onClick={this.props.onPositiveNegative}>+/-</button>
        <button id="zero" onClick={this.props.onDigit}>0</button>
        <button id="decimal" onClick={this.props.onDecimal}>.</button>
        <button id="equals" onClick={this.props.onEqual}>=</button>
      </div>
    )
  }
}