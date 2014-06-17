/*

*/

// make a queue
var makeQueue = function () {
	var queue = {};
	var size = 0;
// have head and tail
  var head = null;
  var tail = null;

// queue - add to tail
  queue.queue = function (value) {
  	var node = this.makeNode(value);
  	size++;
  	// if head or tail is null, then the list is empty
  	if (head === null) {
  		head = node;
  		tail = node;
  	} else {
  		tail.next = node;
  		tail = node;
  	}
  };

// return size
queue.size = function () {
	return size;
};

// dequeue - remove from head
queue.dequeue = function () {
	// if head is null, list is empty
	if (head === null) {
		return null
	} else {
		var node = head;

		if (node.next === null) {
			head = null;
			tail = null;
		} else {
			head = node.next;
		}
    size--;
		return node.value;
	}
};

// create a node
  queue.makeNode = function (value) {
  	var node = {};
  	node.value = value;
  	node.next = null;
  	return node;
  };

  return queue;
};

// execute Queue test
var executeQueue = function () {}

/////////
// make a tree
var Tree = function (val) {
	val = val || null;
	this.value = val;
	this.children = [];
	this.parent = null;
};

// add a child
Tree.prototype.addChild = function (val) {
	var child = new Tree(val);
	this.children.push(child);
	child.parent = this;
};

// remove a child
Tree.prototype.removeChild = function (node) {
	if (node === undefined) {
		var p = this.parent;
		if (p === null) {
			return null;
		}
		for (var i = 0; i < p.children.length; i++) {
			var child = p.children[i];
			if (child === this) {
				var removed = p.children.spice(i, 1);
				return removed;
			}
		}
	} else {
		for (var i = 0; i < this.children; i++) {
			var child = this.children[i];
			if (node === child) {
				var removed = this.children.splice(i, 1);
				return removed;
			}
		}
	}
}

// ancestor
Tree.prototype.isAncestor = function (node) {
	return node;
};


///////// create a binary tree?

// how to balance binary tree
// easy way === take all the values, sort them (should be sorted already) and start from scratch


// assume sorted? no
var createBinaryTree = function (arrayOfValues) {
	// for empty arrays
	if (arrayOfValues.length < 1) { return null; }

	var mid = Math.floor(arrayOfValues.length/2);

	var node = {value: null, left: null, right: null};
	node.value = arrayOfValues[mid];

	// base case
	if (arrayOfValues.length === 1) { return node; }

	// logic [4, 5]
	node.left = createBinaryTree(arrayOfValues.slice(0, mid));
	node.right = createBinaryTree(arrayOfValues.slice(mid+1));

	return node;
};

// depth first
getAll = function (binTree, result) {
	result = result || [];
	// if a leaf, push value
	if (binTree.left === null && binTree.right === null) {
		result.push(binTree.value);
		return result;
	}

	if (binTree.left !== null) {
		getAll(binTree.left, result);
	}

	result.push(binTree.value);

	if (binTree.right !== null) {
		getAll(binTree.right, result);
	}

	return result;
};

var executeTest = function () {
	var r = [];

	// basic tree
  var test1 = [0, 1, 2];
	var bintree1 = createBinaryTree(test1);
	var all = getAll(bintree1);

	r[0] = bintree1.value === 1;
	r[1] = bintree1.left.value === 0; 
	r[2] = bintree1.right.value === 2;
	r[3] = bintree1.left.left === null;
	
	r[4] = all[0] === 0 && all[1] === 1 && all[2] === 2;
	r[5] = all;
	// console.log.apply(null, r);

  // more nums
	var test2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var r1 = [];
	var bintree2 = createBinaryTree(test2);
	r1[0] = getAll(bintree2);
	debugger;

	console.log.apply(null, r1);
};

// executeTest();

///////// breadth first search
var breadthFirstValues = function (binTree, queue, results) {
	queue = queue || [];
	results = results || [];
	queue.push(binTree);
	var node;

	while (node = queue.shift()) {
		results.push(node.value);
		if (node.left !== null) {
			queue.push(node.left);
		}
		if (node.right !== null) {
			queue.push(node.right);
		}
	}
	return results;
};

var executeBFV = function () {
	var binTree = createBinaryTree([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	var r00 = breadthFirstValues(binTree);

	console.log(r00);
};

// executeBFV();

/* PLAN

  BUT, how to know to add node.stop????
  - can add a depth property
    + depth first search and add to linked list of same depth in array
    + breadth first and check which linked list to add to
  - do not mutate original binTree, add depth property to the queue

  when i dequeue // shift
    if node.stop === true      // OR node.depth === results[depth]?
      push RLL to LL results
      RLL = null 
    else 
      if RLL === null -> make a RLL
      add to RLL

  MATHEMATICAL??
*/

var LinkedList = function () {
  this.head = null;
  this.tail = null;
  this.size = 0;
};

LinkedList.prototype.addNode = function (val) {
	var newNode = this.makeNode(val);
	this.size++;
	if (this.tail === null) {
		this.head = newNode;
		this.tail = newNode;
	} else {
		this.tail.next = newNode;
		this.tail = newNode;
	}
	return this.size;
}

LinkedList.prototype.makeNode = function (val) {
	var node = {value: val, next: null};
	return node;
};

var breadthFirstLL = function (binTree) {
	var LLists = [];
	var queue = []; // each element is an object {node: node, depth: 0}
	var valueResults = [];

	// root node is going to be depth of 0
	queue.push({node: binTree, depth: 0});

	// if i queue left or right, i add one to the depth
	// when i dequeue
	while (nodeObj = queue.shift()) {
		// create link list if doesn't exist
		if (LLists[nodeObj.depth] === undefined) {
			LLists[nodeObj.depth] = new LinkedList();
		}

		// add to linked list
		LLists[nodeObj.depth].addNode(nodeObj.node.value);

		// queue left and right nodes 
		if (nodeObj.node.left !== null) {
			queue.push({node: nodeObj.node.left, depth: nodeObj.depth + 1});
		}

		if (nodeObj.node.right !== null) {
			queue.push({node: nodeObj.node.right, depth: nodeObj.depth + 1});
		}
	}
	return LLists;
};

var executeBFLL = function () {
	var bintree = createBinaryTree([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	var r00 = breadthFirstLL(bintree);
	console.log(r00);
};

// executeBFLL();

// 4.1 check for a balanced binary tree
// returns true or false
var isBinaryBalanced = function (binTree, leftDepth, rightDepth) {
	// the answer we are looking for is if left depth - right depth is greater than 1
	leftDepth = leftDepth || 0;
	rightDepth || 0;

	var findLeftDepth = function (node) {
		if (node.left !== null) {
			return 1 + findLeftDepth(node.left);
		} else {
			return 0;
		}
	};

	var findRightDepth = function (node) {
		if (node.right !== null) {
			return 1 + findRightDepth(node.right);
		} else {
			return 0;
		}
	};

	return Math.abs(findLeftDepth(binTree.left) - findRightDepth(binTree.right)) > 1;

};

