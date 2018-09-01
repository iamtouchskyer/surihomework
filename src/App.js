import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import './App.css';
import './A4.css';
import { Card, Col, Row, Divider } from 'antd';

const gridStyle = {
  margin: '10px',
  textAlign: 'center',
};

function multiGenerator() {
  const bit = 4;
  return {
    mul1: _.random(1, Math.pow(10, bit)),
    mul2: _.random(1, 9),
    bit: 4,
  };
}

class Question extends Component {
  constructor(props) {
    super(props);

    const placeholderTd = (<td width={1/(this.props.bit+1)*100+'%'}>&nbsp;</td>);
    const nonPlaceholderTd = (str) =>  (<td width={1/(this.props.bit+1)*100+'%'}>{str}</td>);

    const mul1Str = String(this.props.mul1);
    const mul2Str = String(this.props.mul2);
    const lenOfMul1Str = _.size(mul1Str);
    const lenOfMul2Str = _.size(mul2Str);

    this.mul1 = _.times(this.props.bit+1, (n) => {
        if (n === 0) return placeholderTd;
        n = n-1;

        if (n < this.props.bit - lenOfMul1Str) 
          return placeholderTd;
        else 
          return nonPlaceholderTd(mul1Str[n - (this.props.bit - lenOfMul1Str)]);
      });

    this.mul2 = _.times(this.props.bit+1, (n) => {
        if (n === 0) return nonPlaceholderTd('*');
        n = n-1;

        if (n < this.props.bit - lenOfMul2Str) 
          return placeholderTd; 
        else 
          return nonPlaceholderTd(mul2Str[n - (this.props.bit - lenOfMul2Str)]);
      });

    this.placeholder = _.times(this.props.bit+1, () => {
      return placeholderTd;
    })
  }

  render() {
    return (
      <div style={gridStyle}>
        <table border="1" width="100%">
          <tbody>
            <tr>{this.mul1}</tr>
            <tr>{this.mul2}</tr>
          </tbody>
        </table>
        <hr />
        <table border="1" width="100%">
          <tbody>
            <tr>{this.placeholder}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class RowOfQuestion extends Component {
  constructor(props) {
    super(props);

    const countPerRow = 3;

    this.cols = _.times(countPerRow, (n) => {
      const multiplier = multiGenerator();

      return (
        <Col span={24/countPerRow}>
          <Question mul1={multiplier.mul1} mul2={multiplier.mul2} bit={multiplier.bit}/>
        </Col>
      );
    });
  }

  render() {
    return (
      <Fragment>
      <Row gutter={16}>
        {this.cols}
      </Row>
      {!this.props.hideHr && <hr />}
      </Fragment>
    );
  }
};

class A4OfQuestion extends Component {
  render() {
    return (
      <div className="page A4">
        <RowOfQuestion />
        <RowOfQuestion />
        <RowOfQuestion />
        <RowOfQuestion />
        <RowOfQuestion />
        <RowOfQuestion hideHr={true}/>
      </div>
    );
  }  
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <A4OfQuestion />
        <A4OfQuestion />
        <A4OfQuestion />
      </div>
    );
  }
}

export default App;
