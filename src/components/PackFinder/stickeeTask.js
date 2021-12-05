export default function wallyWidgets(amount, packs) {
	const solutions = [];
	const output = [];

	const find = (widgets) => {
		//Variables to hold the types of packs, the cache, final output
		const initialWidgets = widgets;
		const obj = {};
		const sortedPacks = [...packs.sort((a, b) => a - b)];

		//Finding how many and which packs to use, use an object (as cache) to keep track of what we used so far
		while (widgets > 0) {
			let max = sortedPacks[sortedPacks.length - 1];
			let min = sortedPacks[0];
			if (max) {
				obj[max] = Math.floor(widgets / max);
			}
			// max ? (obj[max] = Math.floor(widgets / max)) : null;
			widgets = widgets % max;
			if (widgets < min && widgets !== 0) {
				obj[min]++;
			}
			sortedPacks.pop();
		}
		//Optimize the number of packs used
		// console.log(obj);
		const keys = Object.keys(obj);
		let currentLoss = 0;
		let index = 0;
		while (obj[keys[index]] > 1 && keys.length > 1 && index < keys.length - 1) {
			currentLoss = obj[keys[index]] * keys[index] - initialWidgets;
			let potentialLoss = keys[index + 1] - initialWidgets;
			if (potentialLoss > currentLoss) {
				break;
			}
			obj[keys[index]] = null;
			obj[keys[index + 1]]++;
			index++;
		}
		return obj;
	};

	/**
	 * Finding all possible solutions and saving the best
	 */
	const tempPacks = [...packs];
	while (tempPacks.length > 0) {
		solutions.push(find(amount));
		tempPacks.pop();
	}
	let bestSolution = null;
	let leastNumberOfPacks = Infinity;

	for (const solution of solutions) {
		let numberOfPacks = 0;
		for (const pack in solution) {
			numberOfPacks += solution[pack];
		}
		if (numberOfPacks < leastNumberOfPacks) {
			leastNumberOfPacks = numberOfPacks;
			bestSolution = solution;
		}
	}

	//Bulding up the output
	for (amount in bestSolution) {
		if (bestSolution[amount] > 0) {
			output.push([amount, bestSolution[amount]]);
		}
	}
	return output;
}
