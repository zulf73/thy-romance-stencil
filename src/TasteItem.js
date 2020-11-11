import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const tasteItemSource = {
  beginDrag(props) {
    console.log('dragging');
    return props.tasteItem;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.tasteItem.id);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class TasteItem extends Component {
  render() {
    const { isDragging, connectDragSource, tasteItem } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <div className="tasteItem" style={{ opacity }}>
        <span>{tasteItem.name}</span>
      </div>
    );
  }
}

export default DragSource('tasteItem', tasteItemSource, collect)(TasteItem);
