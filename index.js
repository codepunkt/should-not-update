import React from 'react'

class ShouldNotUpdate extends React.Component {
  shouldComponentUpdate() {
    return this.props.exceptWhen
  }
  render() {
    const { children, component, ...rest } = this.props
    delete rest.exceptWhen
    return React.createElement(component, rest, children)
  }
}

ShouldNotUpdate.propTypes = {
  component: React.PropTypes.node,
  children: React.PropTypes.node.isRequired,
  exceptWhen: React.PropTypes.bool,
}

ShouldNotUpdate.defaultProps = {
  component: 'div',
  exceptWhen: false,
}

export default ShouldNotUpdate
