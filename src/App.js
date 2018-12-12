import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Menu, Dropdown, Button, Icon } from 'antd';
import './App.css';
import './A4.css';
import QuestionGenerator from './QuestionGenerator.js';

class AddMore extends Component {
  constructor(props) {
    super(props);

    this.addMenu = (
      <Menu onClick={(e) => this.props.onAddClick(e.item.props.operator, e.item.props.bit)}>
        {this.generateSubMenu("随机", 3, 3, 8)}
        {this.generateSubMenu("乘法", 0, 3, 8)}
        {this.generateSubMenu("加法", 1, 3, 8)}
        {this.generateSubMenu("减法", 2, 3, 8)}
      </Menu>
    );
  }

  generateSubMenu = (title, operatorIndex, start, end) => {
    return (
      <Menu.SubMenu title={title}>
        {_.times(end - start + 1, (n) => (<Menu.Item key={n} operator={operatorIndex} bit={start+n}>{start+n}位数</Menu.Item>))}
      </Menu.SubMenu>
    );
  }

  render() {
    return (
      <Fragment>
        <Dropdown overlay={this.addMenu} trigger={['click']}>
          <Button type="primary" size="large" style={{ marginLeft: 8 }}>加十页<Icon type="down" /></Button>
        </Dropdown>
        <Button type="danger" size="large" onClick={this.props.onClearClick}>清除</Button>
      </Fragment>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList : [],
      readingHistory: null
    };
  }

  onAddClick(operator, bit) {
    this.setState({questionList : [...this.state.questionList, ...(_.times(10, () => (<QuestionGenerator key={_.uniqueId()} operator={operator} bit={bit} />)))]});
  }

  onClearClick() {
    this.setState({questionList: []});
  }

  onReadingHistoryClick() {
    this.setState({readingHistory: this.renderReadingHistory(10)});
  }
  onReadingHistoryClear() {
    this.setState({readingHistory: null});
  }

  renderReadingHistory(nPages) {
    const readingTable = () => (
      <table border="1">
        <tr>
          <th width="10%">日期<br/>(Date)</th>
          <th width="50%">书名<br/>(Book title)</th>
          <th width="10%">阅读时间<br/>(Minute)</th>
          <th width="10%">累计阅读时间<br/>(Total Time)</th>
          <th width="10%">家长签名<br/>(Parent signature)</th>
        </tr>
        {_.times(5, () => readingColumn)}
      </table>
    );

    const readingColumn = (
      <tr>
        <td width="10%">&nbsp;<br/>&nbsp;</td>
        <td width="50%"></td>
        <td width="10%"></td>
        <td width="10%"></td>
        <td width="10%"></td>
      </tr>
    );

    return (
      _.times(nPages, () => {
        return (
          <div className="page A4">
            {readingTable()}
            <br />
            <br />
            {readingTable()}
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className="App">
        <div className="fixedLayer no-print">
          <AddMore 
            onAddClick={this.onAddClick.bind(this)}
            onClearClick={this.onClearClick.bind(this)}
            />
          <br />
          <br />
          <Button.Group>
            <Button type="primary" size="large" style={{ marginLeft: 8 }} onClick={this.onReadingHistoryClick.bind(this)}>阅读历史</Button>
            <Button type="danger" size="large" style={{ marginLeft: 8 }} onClick={this.onReadingHistoryClear.bind(this)}>清除阅读历史</Button>
          </Button.Group>
        </div>
        {this.state.questionList}
        {this.state.readingHistory}
      </div>
    );
  }
}

export default App;
