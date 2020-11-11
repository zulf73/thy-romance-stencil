import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Groupchat from './Groupchat';
import Login from './Login';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Target extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: props.user,
      isLoggedIn: false
    };
  }
  render() {
    const { connectDropTarget, hovered, tasteItem } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    // go to login
    // set this.state.isLoggedIn true
    // show Groupchat
    if ( this.state.isLoggedIn ) {
      return connectDropTarget(
        <div className="target" style={{ background: backgroundColor }}>
          <Groupchat />
        </div>
      );
    }
    return(
      <div className="target" style={{ background: backgroundColor }}>
      <Login />
    </div>

    );
  }
}

export default DropTarget('item', {}, collect)(Target);
