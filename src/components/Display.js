import React from 'react';

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.onTextareaChanged = this.onTextareaChanged.bind(this);
  }

  onTextareaChanged() {
    
  }

  render() {
    return (
      <div className="display-toolbar">
        <div className="toolbar">
          <div>
            Calculator
          </div>
          <div className="toolbar-item" id="view-history" onClick={this.props.onHistory}>{this.props.isShowHistory ? <i className="far fa-keyboard"></i> : <i className="fas fa-history"></i>}</div>
        </div>
        <form className="display">
          <textarea className="display-formula" onChange={this.onTextareaChanged} value={this.props.formula.join("")} ></textarea>
          <textarea className="display-input" id="display" rows="1" onChange={this.onTextareaChanged} value={this.props.input}></textarea>
        </form>
      </div>
    )
  }
}