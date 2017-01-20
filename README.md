# ShouldNotUpdate
[![npm version](https://badge.fury.io/js/should-not-update.svg)](https://badge.fury.io/js/should-not-update) [![Build Status](https://travis-ci.org/codepunkt/should-not-update.svg?branch=master)](https://travis-ci.org/codepunkt/should-not-update) [![Coverage Status](https://coveralls.io/repos/github/codepunkt/should-not-update/badge.svg?branch=master)](https://coveralls.io/github/codepunkt/should-not-update?branch=master)

Simple higher order component utilizing the `shouldComponentUpdate` lifecycle hook.
```javascript
import ShouldNotUpdate from 'should-not-update'

const ShouldNotUpdateComponent = ShouldNotUpdate(InnerComponent)

const MyComponent = ({ someProp }) => (
  <ShouldNotUpdateComponent someProp={someProp}>
    This is not updating on property change
  </ShouldNotUpdateComponent>
)
```

### Exceptions to the rule
Sometimes you want components to re-render under certain conditions. You can add these conditions by setting the `exceptWhen` parameter.
```javascript
const ShouldNotUpdateComponent = ShouldNotUpdate(InnerComponent,
  (nextProps) => nextProps.someProp === 42)

const MyComponent = ({ someProp }) => (
  <ShouldNotUpdateComponent someProp={someProp}>
    This only updates on property change when someProp is 42
  </ShouldNotUpdateComponent>
)
```

### Use cases
Amongst others, one possible use case is not re-rendering static children of a [react-motion](https://github.com/chenglou/react-motion) spring animation on every animation frame.
```javascript
import { Link } from 'react-router'
import { Motion, spring } from 'react-motion'

const ShouldNotUpdateComponent = ShouldNotUpdate(() => (
  <ul>
    <li><Link to="/">Home</Link></li>
  </ul>
)))

const OffCanvas = ({ isVisible }) => (
  <Motion style={{ left: spring(isVisible ? 0 : -250) }}>
    {style => (
      <nav role="navigation" style={style}>
        <ShouldNotUpdateComponent />
      </nav>
    )}
  </Motion>
);
```
