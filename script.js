class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(dataArray) {
    this.root = this.buildTree(dataArray);
  }

  buildTree(array) {
    const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

    function recusriveBuild(start, end) {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(sortedArray[mid]);

      node.left = recusriveBuild(start, mid - 1);
      node.right = recusriveBuild(mid + 1, end);

      return node;
    }

    return recusriveBuild(0, sortedArray.length - 1);
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.insertNode(node.right, value);
    }
    return node;
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    }

    if (node.left === null) {
      return node.right;
    } else if (node.right === null) {
      return node.left;
    } else {
      let childParrent = node;
      let child = childParrent.right;

      while (child.left) {
        childParrent = child;
        child = child.left;
      }

      if (childParrent !== node) {
        childParrent.left = child.right;
      } else {
        childParrent.right = child.right;
      }

      node.data = child.data;

      return node;
    }
  }

  find(value) {
    const node = this.findNode(this.root, value);
    if (node) {
      console.log(`Node ${node.data} was found`);
    } else {
      console.log(`Node ${value} can't be found`);
    }
  }

  findNode(node, value) {
    if (node === null || node.data === value) {
      return node;
    }

    if (value < node.data) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  }

  // Lopping version for levelOrder function
  // levelOrder(callback) {
  //   const result = [];
  //   const queue = [this.root];

  //   while (queue.length > 0) {
  //     const current = queue.shift();

  //     if (current) {
  //       if (callback) {
  //         callback(current);
  //       } else {
  //         result.push(current.data);
  //       }

  //       if (current.left) {
  //         queue.push(current.left);
  //       }

  //       if (current.right) {
  //         queue.push(current.right);
  //       }
  //     }
  //   }

  //   return result;
  // }

  //levelOrder function recursive version
  levelOrder(callback, queue = [this.root], result = []) {
    if (queue.length === 0) {
      console.log(result);
      return result;
    }

    const current = queue.shift();

    if (current) {
      if (callback) {
        callback(current);
      } else {
        result.push(current.data);
      }

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }

      this.levelOrder(callback, queue, result);
    }
  }

  inOrder(callback) {
    const result = [];
    this.inOrderTraversal(this.root, callback, result);
    console.log(result);
  }

  inOrderTraversal(node, callback, result) {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback, result);
      result.push(node.data);
      if (callback) {
        callback(node);
      }
      this.inOrderTraversal(node.right, callback, result);
    }
  }

  preOrder(callback) {
    const result = [];
    this.preOrderTraversal(this.root, callback, result);
    console.log(result);
  }

  preOrderTraversal(node, callback, result) {
    if (node) {
      result.push(node.data);
      if (callback) {
        callback(node);
      }
      this.preOrderTraversal(node.left, callback, result);
      this.preOrderTraversal(node.right, callback, result);
    }
  }

  postOrder(callback) {
    const result = [];
    this.postOrderTraversal(this.root, callback, result);
    console.log(result);
  }

  postOrderTraversal(node, callback, result) {
    if (node) {
      if (callback) {
        callback(node);
      }
      this.postOrderTraversal(node.left, callback, result);
      this.postOrderTraversal(node.right, callback, result);
      result.push(node.data);
    }
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, current = this.root, count = 0) {
    if (node === null || current === null) {
      return null;
    }

    if (node < current.data) {
      current = current.left;
      count++;
      return this.depth(node, current, count);
    }

    if (node > current.data) {
      current = current.right;
      count++;
      return this.depth(node, current, count);
    }

    if (node === current.data) {
      return count;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftH = this.isBalanced(node.left);
    if (!leftH) {
      return false;
    }

    const rightH = this.isBalanced(node.right);
    if (!rightH) {
      return false;
    }

    const diffH = Math.abs(leftH - rightH);
    if (diffH > 1) {
      return false;
    }

    return true;
  }

  reBalance() {
    if (this.root === null) return;
    const sortedArray = Array.from(new Set(array)).sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
