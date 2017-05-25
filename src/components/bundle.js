import React from 'react';

class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.load !== nextProps.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({mod: null});
    props.load(mod => {
      this.setState({
        mod: mod.default || mod
      });
    });
  }

  render() {
    const Component = this.state.mod;
    
    if (!Component) return null;

    return <Component {...this.props} />;
  }
}

export default Bundle;
