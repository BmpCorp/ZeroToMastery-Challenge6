// Find first available combination of two components.
const findTwoComponents = (array, sum) =>
{
	for (let i = 0; i < array.length - 1; i++)
	{
		for (let j = i + 1; j < array.length; j++)
		{
			if (array[i] + array[j] === sum)
				return [array[i], array[j]];
		}
	}
	return "No combinations found";
}

// Find all available combinations of two components (unique combinations only).
const findTwoComponentsAll = (array, sum) =>
{
	let result = [];
	// We create copy of array to make search faster later.
	let arrayCopy = array.slice(0);
	let newCombinationFound;
	do
	{
		newCombinationFound = false;
		// Let's use previous function to find first available combination.
		let components = findTwoComponents(arrayCopy, sum);
		if (typeof components === "object")
		{
			result.push(components);
			// We don't need the same combination later, so let's filter out both components.
			// That SHOULD make search a lot faster if there's repeated numbers in source array.
			arrayCopy = arrayCopy.filter((num) =>
			{
				return num !== components[0] && num !== components[1];
			});
			// Then let's search for a new combination.
			newCombinationFound = true;
		}
	}
	while (newCombinationFound);
	return result.length ? result : "No combinations found";
}