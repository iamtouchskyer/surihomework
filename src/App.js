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
        <Menu.SubMenu title="随机">
          <Menu.Item key="0" operator={3} bit={3}>3位数</Menu.Item>
          <Menu.Item key="1" operator={3} bit={4}>4位数</Menu.Item>       
          <Menu.Item key="2" operator={3} bit={5}>5位数</Menu.Item>       
        </Menu.SubMenu>
        <Menu.SubMenu title="乘法">
          <Menu.Item key="0" operator={0} bit={3}>3位数</Menu.Item>
          <Menu.Item key="1" operator={0} bit={4}>4位数</Menu.Item>       
          <Menu.Item key="2" operator={0} bit={5}>5位数</Menu.Item>       
        </Menu.SubMenu>
          <Menu.SubMenu title="加法">
          <Menu.Item key="0" operator={1} bit={3}>3位数</Menu.Item>
          <Menu.Item key="1" operator={1} bit={4}>4位数</Menu.Item>       
          <Menu.Item key="2" operator={1} bit={5}>5位数</Menu.Item>       
        </Menu.SubMenu>
          <Menu.SubMenu title="减法">
          <Menu.Item key="0" operator={2} bit={3}>3位数</Menu.Item>
          <Menu.Item key="1" operator={2} bit={4}>4位数</Menu.Item>       
          <Menu.Item key="2" operator={2} bit={5}>5位数</Menu.Item>       
        </Menu.SubMenu>
      </Menu>
    );
  }

  render() {
    return (
      <Fragment>
        <Dropdown overlay={this.addMenu} trigger={['click']}>
          <Button type="primary" size="large" style={{ marginLeft: 8 }}>加一页<Icon type="down" /></Button>
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
    this.setState({questionList : [...this.state.questionList, (<QuestionGenerator key={_.uniqueId()} operator={operator} bit={bit}/>)]});
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
