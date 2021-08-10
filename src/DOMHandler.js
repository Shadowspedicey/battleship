import Game from "./Game";

const DOMHandler = (() =>
{
	const lengths = [5, 4, 3, 3, 2];

	const createBoard = (domBoard, board, player) =>
	{
		let l = 0;
		// i is the y axis
		for (let i = 0; i < 10; i++)
		{
			// j is the x axis
			for (let j = 0; j < 10; j++)
			{
				const gridElement = document.createElement("div");
				gridElement.classList.add("board-element");
				gridElement.dataset.coords = `(${j}, ${i})`;
				domBoard.appendChild(gridElement);

				// Check if have to place first
				if (!player)
				{
					gridElement.addEventListener("click", () => 
					{
						board.receiveAttack(j, i);
						Game.playRound();
					}, {once: true});
				} 
				
				else
				{
					gridElement.addEventListener("mouseover", () =>
					{
						for (let k = j; k < lengths[l] + j; k++)
						{
							const element = gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`);
							if (!element) return;
							element.classList.add("hovered");
						}
					});

					gridElement.addEventListener("mouseout", () =>
					{
						for (let k = j; k <= lengths[l] + j; k++)
						{
							const element = gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`);
							if (!element) return;
							element.classList.remove("hovered");
						}
					});

					gridElement.addEventListener("click", () =>
					{
						if (board.placeShip(j, i, lengths[l], false, true) === true)
						{
							board.placeShip(j, i, lengths[l], false, true);
							for (let k = j; k <= lengths[l] + j; k++)
							{
								gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`).classList.remove("hovered");
							}
							l++;
							if (l === 5) domBoard.style.pointerEvents = "none";
						}
					});
				}
			}
		}
	};

	const placeShip = (x, y, domBoard, visible = false) =>
	{
		const element = domBoard.querySelector(`.board-element[data-coords="(${x}, ${y})"]`);
		if (visible) element.style.backgroundColor = "red";
	};

	const missShot = (x, y, domBoard) => 
		domBoard.querySelector(`.board-element[data-coords="(${x}, ${y})"]`).style.backgroundColor = "yellow";

	const hitShot = (x, y, domBoard) =>
		domBoard.querySelector(`.board-element[data-coords="(${x}, ${y})"]`).classList.add("hit");

	return { createBoard, placeShip, missShot, hitShot };
})();

export default DOMHandler;
