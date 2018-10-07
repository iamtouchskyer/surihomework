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
        {this.generateSubMenu("随机", 3, 3, 7)}
        {this.generateSubMenu("乘法", 0, 3, 6)}
        {this.generateSubMenu("加法", 1, 3, 6)}
        {this.generateSubMenu("减法", 2, 3, 6)}
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
      questionList : []
    };
  }

  onAddClick(operator, bit) {
    this.setState({questionList : [...this.state.questionList, ...(_.times(10, (n) => (<QuestionGenerator key={_.uniqueId()} operator={operator} bit={bit}/>)))]});
  }

  onClearClick() {
    this.setState({questionList: []});
  }

  render() {
    return (
      <div className="App">
        <div className="fixedLayer no-print">
          <AddMore 
            onAddClick={this.onAddClick.bind(this)}
            onClearClick={this.onClearClick.bind(this)}
            />
        </div>
        {this.state.questionList}
      </div>
    );
  }
}

export default App;
