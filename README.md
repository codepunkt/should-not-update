# ShouldNotUpdate
Simple component utilizing the `shouldComponentUpdate` lifecycle hook. Wrap it around child components that you don't want to rerender on property changes.
```javascript
import ShouldNotUpdate from 'should-not-update'

const MyComponent = ({ someProp }) => (
  <ShouldNotUpdate>
    <InnerComponent someProp={someProp}>
      This is not updating on property change
    </InnerComponent>
  </ShouldNotUpdate>
)
```
### Rendered component
By default, `ShouldNotUpdate` will render as a `div` element, but that can be changed by setting the `component` prop, which accepts either a tag name string (such as 'div' or 'span')
```javascript
<ShouldNotUpdate component="ul">
```
or a React component type (a class or a function), which should render their children to be useful.
```javascript
const MyComponent = ({ children }) => (
  <div>
    {children}
  </div>
)

<ShouldNotUpdate component={MyComponent}>
```
### Exceptions to the rule
Sometimes you want child components to re-render under certain conditions. You can add these conditions by setting the `exceptWhen` prop.
```javascript
const MyComponent = ({ someProp }) => (
  <ShouldNotUpdate exceptWhen={someProp === 42}>
    <InnerComponent someProp={someProp}>
      This only updates on property change when someProp is 42
    </InnerComponent>
  </ShouldNotUpdate>
)
```

### Other properties
All properties besides `children`, `component` and `exceptWhen` are directly passed to the rendered component.
```javascript
const MyComponent = ({ someProp }) => (
  <ShouldNotUpdate component="nav" role="navigation">
    <InnerComponent someProp={someProp}>
      This is not updating on property change
    </InnerComponent>
  </ShouldNotUpdate>
)
```
### Use cases
Amongst others, one possible use case is not re-rendering static children of a [react-motion](https://github.com/chenglou/react-motion) spring animation on every animation frame.
```javascript
import { Link } from 'react-router'
import { Motion, spring } from 'react-motion'

const OffCanvas = ({ isVisible }) => (
  <Motion style={{ left: spring(isVisible ? 0 : -250) }}>
    {style => <nav role="navigation" style={style}>
      <ShouldNotUpdate component="ul">
        <li><Link to="/">Home</Link></li>
      </ShouldNotUpdate>
    </nav>}
  </Motion>
);
```
