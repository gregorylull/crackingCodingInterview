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
  - check array value at midIndex
  - if smaller -> run bin search on smaller portion of array
    + startIndex remains the same
    + endIndex is midpoint-1
  - if larger -> run bin search on larger partition of array
    + startIndex to midpoint+1
    + endIndex remains the same
  * using slice would negate the benefits of binary search
  * need to keep track of beginning and endIndex of partition // inclusive
	  + two pointers 

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
};

// executeBinarySearch();

/// Merge sort
/*
  two parts to merge sort, the SPLIT, and the MERGE

  SPLIT
  - takes in an array of elements
    + option for ascending or descending? or function for comparison?
  - will partition this array in two parts and sort each half
  - each half will run the same logic, split/sort until down to an array of single / two elements
    + creating a new array? no...that would make it n^2? or 2n? both bad. we need logarithmic

  MERGE
  - NO swapping in place, have to create a new array...
    + swapping in place is the SAME as other types of sort,
     e.g.: image case: [7, 1, 5, 6], eventually have to compare 7 to 6
  - iterate through leftPart and rightPart, not through for loops...otherwise would be for-within-for
    + recursive?
    + branching?
  - if nothing remains on one side, then take the rest of the otherside, and push to array / concat with array

  PARAMS:
  - takes array
  - going to have an inner function?

*/

var merge = function (array, leftArray, rightArray) {
	var leftCount = 0;
	var rightCount = 0;

	for (var i = 0; i < array.length; i++) {
		leftElement = leftArray[leftCount];
		rightElement = rightArray[rightCount];

    // check if right and left elements are defined, that means we've taken all of them, and we can append the other side to the array
		if (leftElement === undefined) {
			array[i] = rightElement;
			rightElement++;
    // if right element is defined, if not, add all left
		} else if (rightElement === undefined) {
			array[i] = leftElement;
			leftElement++;
    // take the left
		} else if (leftElement <= rightElement) {
			array[i] = leftElement;
			leftCount++;

    // take the right
		} else {
			array[i] = rightElement;
			rightCount++;
		}
	}

	return array;
};

var mergeSort = function (array) {

	// default corner cases, if only one element, then return the element, it is sorted
	if (array.length <= 1) { return array; }

	// base, terminal
	var midIndex = Math.floor(array.length/2);

	// logic. Left and right
	var leftArray = mergeSort(array.slice(0, midIndex));
	var rightArray = mergeSort(array.slice(midIndex));

	// merge left and right
	return merge(array, leftArray, rightArray);
};

var executeMergeSort = function () {
	var results = {};
	var count = 0;

	var test0 = [];
	var r00 = mergeSort(test0).length === 0;
  console.log('checked test:', count)
  count++;

	var test1 = [5];
	var r01 = mergeSort(test1)[0] === 5;
  console.log('checked test:', count)
  count++;

	var test2 = [-4];
	var r02 = mergeSort(test2)[0] === -4;
  console.log('checked test:', count)
  count++;

	var test3 = [-3, 4];
	var r03 = mergeSort(test3)[0] === -3;
	var r04 = mergeSort(test3)[1] === 4;
  console.log('checked test:', count)
  count++;

	var test4 = [3, 1];
	var r05 = mergeSort(test4)[0] === 1;
	var r06 = mergeSort(test4)[1] === 3;
  console.log('checked test:', count)
  count++;

	var test5 = [4, 1, 2, 3];
	var r07 = mergeSort(test5);
  console.log('checked test:', count)
  count++;

 	var test6 = [3, 2, 4, 0, 7, 1, 5, 6];
	var r08 = mergeSort(test6);
  console.log('checked test:', count)
  count++;

	var test7 = createRange(-4, 13, 1, true);
	var r09 = mergeSort(test7);
  console.log('checked test:', count)
  count++;

	console.log(r00, r01, r02, r03, r04, r05, r06); 
	console.log(r07);
	console.log(r08);
	console.log(r09);
};

executeMergeSort();
