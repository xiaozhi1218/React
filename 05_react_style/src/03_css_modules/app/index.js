import React, { PureComponent } from 'react';

import './common.css'
import style from './style.module.css';

import Home from '../home';
import Profile from '../profile';

export default class App extends PureComponent {
  render() {
    return (
      <div id="app">
        App
        <h2 className={'fs ' + style['app-title']}>我是App的title1</h2>
        <h2 className={`fs ${style['app-title']}`}>我是App的title2</h2>
        <h2 className={`fs ${style.title}`}>我是App的title3</h2>
        <Home/>
        <Profile/>
      </div>
    )
  }
}
