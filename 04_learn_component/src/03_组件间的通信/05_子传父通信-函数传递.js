import React, { Component } from 'react';


class CounterButton extends Component {
  render() {
    const {onClick} = this.props;
    return (
      <div>
        <button onClick={onClick}>+1</button>
        <input onChange={this.props.onChange}/>
      </div>
    )
  }
}


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      son: ""
    }
  }

  render() {
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+</button>
        <CounterButton onClick={e => this.increment()} name="why"/>
        <p>这里显示 Son 组件的内容：{this.state.son}</p>
        <CounterButton onChange={this.changeHandler.bind(this)} />
      </div>
    )
  }

  changeHandler(e) {
    console.log(e);
    this.setState({
      son: e.target.value
    });
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
