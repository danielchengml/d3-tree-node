import React, { Component } from "react";
import "./App.css";
import data from "./data";

class App extends Component {
  state = {
    treeData: []
  };

  componentDidMount() {
    this.createTree();
  }

  createTree() {
    // flatten to object with string keys that can be easily ref'd later
    const dataMap = data.reduce((map, node) => {
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
        this.state.treeData.push(node);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Tree Node</h2>
        </header>
        <svg ref={node => (this.node = node)} width={500} height={500} />
      </div>
    );
  }
}

export default App;
