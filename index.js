import React from 'react'

const ShouldNotUpdate = (Component, exceptWhen = () => false) => class extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return exceptWhen(nextProps)
  }

  render() {
    return <Component {...this.props} />
  }
}

export default ShouldNotUpdate
