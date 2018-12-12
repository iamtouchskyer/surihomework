import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

function multiGenerator(bit) {
  return {
    operator1: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    operator2: _.random(Math.pow(10, bit-1), Math.pow(10, bit)),
    bit: bit,
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
  const operators = [multiGenerator, addGenerator, subGenerator];

  return operators[operatorIndex];
}

function getGeneratorSymbol(operatorIndex) {
  const operators = ['*', '+', '-'];

  return operators[operatorIndex];
}

class Question extends Component {
  constructor(props) {
    super(props);

    const symbol = getGeneratorSymbol(this.props.operator);
    const countOfPlaceholder = this.props.operator === 0 ? this.props.bit*2 : this.props.bit+1;

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

    const countPerRow = (props.bit >= 8 || (props.operator === 0 && props.bit >= 5)) ? 2 : 3;

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
   if (this.props.operator === 3) {
    return (
        <div className="page A4" style = {{"page-break-before": "always"}}>
          <RowOfQuestion {...this.props} operator={0} />
          <RowOfQuestion {...this.props} operator={1} />
          <RowOfQuestion {...this.props} operator={2} />
          <RowOfQuestion {...this.props} operator={0} />
          <RowOfQuestion {...this.props} operator={1} />
          <RowOfQuestion {...this.props} operator={2} hideHr={true} />
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
  operator: 0,
  bit: 4,
};

export default QuestionGenerator;