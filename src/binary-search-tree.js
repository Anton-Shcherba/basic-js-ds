const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.origin = null;
  }

  root() {
    return this.origin;
  }

  add(data) {
    this.origin = addWithin(this.origin, data);

    function addWithin(node, value) {
      if (!node) return new Node(value);
      if (node.data === value) return node;
      if (value < node.data) node.left = addWithin(node.left, value);
      else node.right = addWithin(node.right, value);
      return node;
    }
  }

  has(data) {
    return hasWithin(this.origin, data);

    function hasWithin(node, value) {
      if (!node) return false;
      if (node.data === value) return true;
      return value < node.data ? hasWithin(node.left, value) : hasWithin(node.right, value);
    }
  }

  find(data) {
    return findWithin(this.origin, data);

    function findWithin(node, value) {
      if (!node)  return null;
      if (node.data === value) return node;
      return value < node.data ? findWithin(node.left, value) : findWithin(node.right, value);
    }
  }

  remove(data) {
    this.root = removeNode(this.origin, data);

    function removeNode(node, value) {
      if (!node) return null;
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } 
      else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } 
      else {
        if (!node.left && !node.right) return null;
        if (!node.left) { 
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left)  minFromRight = minFromRight.left;
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.origin) return null;
    let node = this.origin;
    while (node.left) node = node.left;
    return node.data;
  }

  max() {
    if (!this.origin) return;
    let node = this.origin;
    while (node.right)  node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};