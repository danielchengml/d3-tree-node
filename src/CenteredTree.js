import React, { Component } from "react";
import Tree from "react-d3-tree";

const containerStyles = {
  width: "100%",
  height: "100vh"
};

class CenteredTree extends Component {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: -dimensions.height / 7
      }
    });
  }

  render() {
    const { root } = this.props;
    console.log(root);
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        <Tree
          data={[root]}
          orientation={"vertical"}
          translate={this.state.translate}
          pathFunc={"straight"}
          textLayout={{ x: 20, y: 0, transform: "rotate(90 0 0)" }}
          separation={{ siblings: 0.2, nonSiblings: 0.4 }}
          scaleExtent={{ min: 1.0, max: 2.0 }}
          depthFactor={300.0}
          initialDepth={1.2}
        />
      </div>
    );
  }
}

export default CenteredTree;
