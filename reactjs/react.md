## React生命周期

- 当首次挂载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount。
- 当卸载组件时，执行 componentWillUnmount。
- 当重新挂载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps。
- 当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

当使用 ES6 classes 构建 React 组件时，static defaultProps = {} 其实就是调用内部的 getDefaultProps方法，constructor 中的 this.state = {} 其实就是调用内部的 getInitialState 方法。