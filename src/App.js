import React, { Component } from "react";
import "./App.css";
import data from "./data";
import CenteredTree from "./CenteredTree";

const parentNode = {
  shape: "circle",
  shapeProps: {
    r: 10,
    fill: "#4fa1ff",
    stroke: "#c4c4c4",
    strokeWidth: "1px"
  }
};

const childNode = {
  shape: "circle",
  shapeProps: {
    r: 10,
    fill: "#bcdbff",
    stroke: "#c4c4c4",
    strokeWidth: "1px"
  }
};

class App extends Component {
  state = {
    name: "",
    nodeSvgShape: parentNode,
    children: []
  };

  componentDidMount() {
    this.sortData();
  }

  sortData() {
    const treeData = [];
    // flatten to object with string keys that can be easily ref'd later
    const dataMap = data.reduce((map, node) => {
      if (node.children.length > 0) {
        node.nodeSvgShape = parentNode;
      } else {
        node.nodeSvgShape = childNode;
      }
      map[node.id] = node;
      return map;
    }, {});
    // for each item in array, replace children id with actual object
    data.forEach(node => {
      // add to parent
      const parent = dataMap[node.parents[0]];
      if (parent) {
        // splice off the child id as long as parent and child id matches
        const removeIndex = parent.children.indexOf(node.id);
        parent.children.filter(child => child === node.id).length > 0 &&
          parent.children.splice(removeIndex, 1);
        // replace the child id with an object
        parent.children.push(node);
      } else {
        treeData.push(node);
      }
    });
    this.setState({ children: treeData });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Tree Node</h2>
        </header>
        <div id="treeWrapper">
          <CenteredTree root={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
