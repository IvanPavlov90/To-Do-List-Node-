import React from "react";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(error) {
    if (error) {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.error) {
      return <div>Something Goes wrong</div>;
    }

    return this.props.children;
  }
}

export default Error;
