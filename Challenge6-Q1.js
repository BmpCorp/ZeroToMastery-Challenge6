const cleanTheRoom = array =>
{
	if (!array || !array.length) return [];
	// Initial array shouldn't be affected, so let's make a shallow copy by using "slice"
	// and sort it. We need a simple ascending sort function to do it.
	let sortedArray = array.slice(0).sort((a, b) => a - b);
	// This is the array for result items.
	let resultArray = [];
	while (sortedArray.length)
	{
		// Let's filter items of sorted array, which are equal to the first one.
		let sameItems = sortedArray.filter((item) => item === sortedArray[0]);
		// Then we add them into result array (as array or as a single item).
		resultArray.push(sameItems.length > 1 ? sameItems : sameItems[0]);
		// Then we remove these items from sorted array and repeat, until it's empty.
		sortedArray.splice(0, sameItems.length);
	}
	return resultArray;
}

// This function slices a piece of same items from array and adds them to result.
const addSliceToResultArray = (source, dest, start, end) =>
{
	let sameItems = source.slice(start, end);
	dest.push(sameItems.length > 1 ? sameItems : sameItems[0]);
}

// This function does the same, but should be faster, I guess.
const cleanTheRoom2 = array =>
{
	if (!array || !array.length) return [];
	let sortedArray = array.slice(0).sort((a, b) => a - b);
	let resultArray = [];
	// This will help us to slice pieces of same items.
	let startIndex = 0;
	// Now it should be faster than previous function since we're iterating only once.
	sortedArray.forEach((num, index) =>
	{
		// When we find first item that's not equal to previous one...
		if (num !== sortedArray[startIndex])
		{
			// We add previous items to result array and remember where we've stopped.
			addSliceToResultArray(sortedArray, resultArray, startIndex, index);
			startIndex = index;
		}
	});
	// Finally, we add remaining part to the result array.
	addSliceToResultArray(sortedArray, resultArray, startIndex);
	return resultArray;
}

// Bonus challenge. The solution is based on cleanTheRoom2.
const sortRoomByType = array =>
{
	if (!array || !array.length) return [];
	// To make things easier, let's first sort copy of array by type of items.
	let sortedArray = array.slice(0).sort((a, b) => typeof a > typeof b);
	let resultArray = [];
	// Then we use the same method as before (iterating only once).
	let startIndex = 0;
	sortedArray.forEach((item, index) =>
	{
		if (typeof item !== typeof sortedArray[startIndex])
		{
			addSliceToResultArray(sortedArray, resultArray, startIndex, index);
			startIndex = index;
		}
	});
	addSliceToResultArray(sortedArray, resultArray, startIndex);
	// Then we sort every array item (if it is actually array).
	resultArray.forEach((item) =>
	{
		if (Array.isArray(item) && item.length)
		{
			// Numbers are sort individually.
			if(typeof item[0] === "number")
			{
				item.sort((a, b) => a - b);
			}
			else
			{
				item.sort();
			}
		}
	});
	return resultArray;
}