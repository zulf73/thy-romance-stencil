import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Groupchat from './Groupchat';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        <Groupchat />
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
