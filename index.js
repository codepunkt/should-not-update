import React from 'react'
import PropTypes from 'prop-types'

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
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  children: PropTypes.node.isRequired,
  exceptWhen: PropTypes.bool,
}

ShouldNotUpdate.defaultProps = {
  component: 'div',
  exceptWhen: false,
}

export default ShouldNotUpdate
