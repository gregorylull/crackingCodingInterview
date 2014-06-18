// ch 11 sorting and searching

/*

Common Sorting Algorithms

  Bubble Sort
    Runtime: O (n^2) average and worse case. 
    Memory: O(1)

    swap first two elements if first is greater than second, go to next pair, so on. 
    iterate through array again

  Selection Sort
    Runtime: O(n^2) average and worst case.
    Memory: O(1).

    find the smallest element, and swap with the front element...
    find the second smallest, and swap with the second element...
    so on

  Merge Sort
    Runtime: O(n Log(n)) average and worse case.
    Memory: Depends

    divides array in half, sort each half, then merge together.
    same divide/sort/merge logic is applied to each half.
    MERGE part does heavy lifting


Searching Algorithms

  Binary Search 
    Runtime: O(n Log(n))
    Memory: Depends

    input array has to be sorted!
*/

/* HELPER FUNCTIONS

*/

// create a range function, ends are inclusive
function createRange (min, max, step, random) {
	min = min || 0;
	max = max || 10;
	step = step || 1;
	random = random || false;

	var result = [];
	for (var i = min; i <= max; i += step) {
		result.push(i);
	}

	// randomize
	if (random) {
		for (var j = 0; j < result.length; j++) {
			var randIndex = Math.floor((Math.random() * result.length));
			swapElements(result, j, randIndex);
		}
	}

	return result;
}

function swapElements(array, indexA, indexB) {
	var temp = array[indexA];
	array[indexA] = array[indexB];
	array[indexB] = temp;

	return array;
}

var executeHelper = function () {
	var range0 = createRange(2, 10, 2);
	var r00 = range0[0] === 2;
	var r01 = range0[4] === 10;
	var r02 = range0.length === 5;

	var range1 = createRange(0, 9);
	var r03 = range1.length === 10;
	var r04 = range1[0] === 0;
	var r05 = range1[9] === 9;

	var range2 = createRange(0, 9, 1, true);

	console.log(r00, r01, r02, r03, r04, r05);
	console.log(range2);
};

// executeHelper();

// binary search
/*
  - input has to be sorted (merge sort)
  - find midIndex
  - check midIndex
  - if smaller -> run bin search on smaller portion of array
  - if larger -> run bin search on larger partition of array
  * using slice would negate the benefits of binary search
  * need to keep track of beginning and endIndex of partition // inclusive
  * two pointers

  [0]                 // mid: 
  [0, 1]              // 
  [0, 1, 2]
  [0, 1, 2, 3]
  [0, 1, 2, 3, 4]
  [0, 1, 2, 3, 4, 5]
*/
// returns true if it contains, false if not. Inclusive
var binarySearch = function (array, target, beginIndex, endIndex, cycles) {
	// default corner case check
	if (array.length === 0 || target < array[0] || target > array[array.length-1]) { return false; }

	// default values
	beginIndex = beginIndex || 0;
	endIndex = endIndex || array.length-1; // instead of length, we calculate based on index position
	cycles = cycles || 0;

  // addition and math.floor gets the midpoint
	var midIndex = Math.floor((endIndex + beginIndex)/2); 


	// base case, if we're on the same index
	// terminate if we found the target
	if (array[midIndex] === target) {
		console.log('found: ', target, true, '  cycles: ', cycles);
		return true;

	// if we DIDN'T find the target, AND the beginning and end point to the same location
	// then we have exhausted our search options
	} else if (beginIndex === endIndex) {
		console.log('found: ', target, false, ' cycles: ', cycles);
		return false;

  // if target is larger, use the larger portion
	} else if (target > array[midIndex]) {
		return binarySearch(array, target, midIndex+1, endIndex, cycles+1);

	// if target is smaller, use the smaller portion
	} else {
		return binarySearch(array, target, beginIndex, midIndex-1, cycles+1);
	}

};

executeBinarySearch = function () {
	var range0 = createRange(0, 10);
	for (var i = -2; i <= 12; i++) {
		binarySearch.apply(null, [range0, i]);
	}

  // var range1 = createRange(0,100);
  // var r01 = binarySearch(range1, 99);


};

executeBinarySearch();

