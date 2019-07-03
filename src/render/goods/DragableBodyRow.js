/* eslint-disable no-param-reassign */
/*
 * @Author: czy0729
 * @Date: 2019-07-03 14:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-03 14:53:33
 */
import React from 'react'
import { DragSource, DropTarget } from 'react-dnd-cjs'

let dragingIndex = -1

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props
    const style = { ...restProps.style, cursor: 'move' }

    let { className } = restProps
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward'
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward'
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    )
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index
    return {
      index: props.index
    }
  }
}

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

// DragableBodyRow
export default DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
)
