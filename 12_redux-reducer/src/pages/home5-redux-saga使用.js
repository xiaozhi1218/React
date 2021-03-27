import React, { PureComponent } from 'react';

// import {connect} from '../utils/connect';
import { connect } from 'react-redux';


import {
  incAction,
  addAction
} from '../store/counter/actionCreators';
import {
  fetchHomeMultidataAction,
  albumFetchRequestedAction
} from '../store/home/actionCreators';

import { ALBUM_FETCH_REQUESTED } from '../store/home/constants';

class Home extends PureComponent {
  componentDidMount() {
    this.props.getHomeMultidata();
    this.props.getAlbumData(5);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>当前计数: {this.props.counter}</h2>
        <button onClick={e => this.props.increment()}>+1</button>
        <button onClick={e => this.props.addNumber(5)}>+5</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counterInfo.counter
})

const mapDispatchToProps = dispatch => ({
  increment() {
    dispatch(incAction());
  },
  addNumber(num) {
    dispatch(addAction(num));
  },
  getHomeMultidata() {
    dispatch(fetchHomeMultidataAction);
  },
  getAlbumData(limit) {
    dispatch(albumFetchRequestedAction({limit}))
    // dispatch({type: ALBUM_FETCH_REQUESTED, payload: {limit}})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
