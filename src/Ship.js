const Ship = (length) =>
{
	const info = [];
	for (let i = 0; i < length; i++)
	{
		info.push(0);
	}

	const hit = number =>
	{
		info[number] = 1;
		return `Ship has been hit at ${number}`;
	};

	const hasSunk = () =>
	{
		for (let i = 0; i < info.length; i++)
		{
			if (info[i] === 0) return false;
		}
		return true;
	};

	return { length, info, hit, hasSunk };
};

export default Ship;
