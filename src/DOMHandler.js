import Game from "./Game";

const DOMHandler = (() =>
{
	const createBoard = (domBoard, board) =>
	{
		for (let i = 0; i < 10; i++)
		{
			for (let j = 0; j < 10; j++)
			{
				const gridElement = document.createElement("div");
				gridElement.classList.add("board-element");
				gridElement.dataset.coords = `(${j}, ${i})`;
				domBoard.appendChild(gridElement);

				gridElement.addEventListener("click", () => 
				{
					board.receiveAttack(j, i);
					Game.playRound();
				}, {once: true});
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
