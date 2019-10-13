import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Constants from './constants';

function multiGenerator(bit) {
  bit = bit-1;  //降低难度
  return {
    operator1: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    operator2: _.random(2, 99),
    bit: bit+1,
  };
}

function divGenerator(bit) {
  bit = bit-2;  //降低难度
  const operator2 = _.random(2, 9);
  let operator1 = 0;

  for (let i=_.random(Math.pow(10, bit-2), Math.pow(10, bit-1)/2); i<Math.pow(10, bit-1); i++) {
    operator1 = operator2*i;
    if (operator1 > Math.pow(10, bit-1) && operator1 < Math.pow(10, bit)) {
      break;
    }
  }

  return {
    operator1: operator1,
    operator2: operator2,
    bit: bit+1,
  };
}

function addGenerator(bit) {
  return {
    operator1: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    operator2: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    bit: bit,
  };
}

function subGenerator(bit) {
  let res = {
    operator1: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    operator2: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    bit: bit,
  };

  if (res.operator1 < res.operator2) {
    [res.operator1, res.operator2] = [res.operator2, res.operator1];
  }

  return res;
}

function getGenerator(operatorIndex) {
  const operators = _.zipObject(
    [Constants.MultiOperator, Constants.DivOperator, Constants.AddOperator, Constants.SubOperator],
    [multiGenerator, divGenerator, addGenerator, subGenerator],
  );

  return operators[operatorIndex];
}

function getGeneratorSymbol(operatorIndex) {
  const operators = _.zipObject(
    [Constants.MultiOperator, Constants.DivOperator, Constants.AddOperator, Constants.SubOperator],
    ['*', '/', '+', '-']
  );

  return operators[operatorIndex];
}

class Question extends Component {
  constructor(props) {
    super(props);

    const symbol = getGeneratorSymbol(this.props.operator);
    const countOfPlaceholder = this.props.operator === Constants.RandomOperator ? this.props.bit*2 : this.props.bit+1;

    const placeholderTd = (<td width={1/countOfPlaceholder*100+'%'}>&nbsp;</td>);
    const nonPlaceholderTd = (str) => (<td width={1/countOfPlaceholder*100+'%'}>{str}</td>);

    const mul1Str = String(this.props.operator1);
    const mul2Str = String(this.props.operator2);
    const lenOfMul1Str = _.size(mul1Str);
    const lenOfMul2Str = _.size(mul2Str);

    this.operator1 = _.times(countOfPlaceholder, (n) => {
        if (n < countOfPlaceholder - lenOfMul1Str) 
          return placeholderTd;
        else 
          return nonPlaceholderTd(mul1Str[n - (countOfPlaceholder - lenOfMul1Str)]);
      });

    this.operator2 = _.times(countOfPlaceholder, (n) => {
        if (n === 0) return nonPlaceholderTd(symbol);
        
        if (n < countOfPlaceholder - lenOfMul2Str) 
          return placeholderTd;
        else 
          return nonPlaceholderTd(mul2Str[n - (countOfPlaceholder - lenOfMul2Str)]);
      });

    this.placeholder = _.times(countOfPlaceholder, () => {
      return placeholderTd;
    })
  }

  render() {
    const gridStyle = {
      margin: '10px',
      textAlign: 'center',
    };

    return (
      <div style={gridStyle} key={_.uniqueId()}>
        <table border="1" width="100%">
          <tbody>
            <tr>{this.operator1}</tr>
            <tr>{this.operator2}</tr>
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

    const countPerRow = (props.bit >= 8 || (props.operator === Constants.MultiOperator && props.bit >= 5)) ? 2 : 3;

    this.cols = _.times(countPerRow, (n) => {
      const operators = getGenerator(this.props.operator)(this.props.bit);

      return (
        <Col key={_.uniqueId()} span={24/countPerRow}>
          <Question operator1={operators.operator1} operator2={operators.operator2} bit={operators.bit} operator={this.props.operator} />
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

class QuestionGenerator extends Component {
 render() {
   if (this.props.operator === Constants.RandomOperator) {
    return (
        <div className="page A4" style = {{"page-break-before": "always"}}>
          <RowOfQuestion {...this.props} operator={Constants.MultiOperator} />
          <RowOfQuestion {...this.props} operator={Constants.DivOperator} />
          <RowOfQuestion {...this.props} operator={Constants.AddOperator} />
          <RowOfQuestion {...this.props} operator={Constants.SubOperator} />
          <RowOfQuestion {...this.props} operator={Constants.MultiOperator} />
          <RowOfQuestion {...this.props} operator={Constants.DivOperator} hideHr={true} />
        </div>
    );
   } else {
      return (
          <div className="page A4" style = {{"page-break-before": "always"}}>
            <RowOfQuestion {...this.props}/>
            <RowOfQuestion {...this.props}/>
            <RowOfQuestion {...this.props}/>
            <RowOfQuestion {...this.props}/>
            <RowOfQuestion {...this.props}/>
            <RowOfQuestion {...this.props} hideHr={true}/>
          </div>
      );
    }
  } 
};

QuestionGenerator.propTypes = {
  size: PropTypes.string,
  operator: PropTypes.number,
  bit: PropTypes.number,
};

QuestionGenerator.defaultProps = {
  size: 'A4',
  operator: Constants.RandomOperator,
  bit: 4,
};

export default QuestionGenerator;