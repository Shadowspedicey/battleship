import Game from "./Game";

const DOMHandler = (() =>
{
	const lengths = [5, 4, 3, 3, 2];
	let vertical = false;

	const createBoard = (domBoard, board, player) =>
	{
		return new Promise(resolve =>
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
						if (i === 0 && j === 0)
						{
							const toggle = document.createElement("h1");
							if (!vertical) toggle.textContent = "Vertical";
							else toggle.textContent = "Horizontal";
							toggle.id = "toggle";
							gridElement.parentElement.parentElement.appendChild(toggle);
							
							toggle.addEventListener("click", () =>
							{
								if (vertical)
								{
									vertical = false;
									toggle.textContent = "Vertical";
								} else
								{
									vertical = true;
									toggle.textContent = "Horizontal";
								}
							});
						}

						gridElement.addEventListener("mouseover", () =>
						{
							if (!vertical)
							{
								for (let k = j; k < lengths[l] + j; k++)
								{
									const element = gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`);
									if (!element) return;
									element.classList.add("hovered");
								}
							} else
							{
								for (let k = i; k < lengths[l] + i; k++)
								{
									const element = gridElement.parentElement.querySelector(`div[data-coords="(${j}, ${k})"]`);
									if (!element) return;
									element.classList.add("hovered");
								}
							}
						});
	
						gridElement.addEventListener("mouseout", () =>
						{
							if (!vertical)
							{
								for (let k = j; k < lengths[l] + j; k++)
								{
									const element = gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`);
									if (!element) return;
									element.classList.remove("hovered");
								}
							} else
							{
								for (let k = i; k < lengths[l] + i; k++)
								{
									const element = gridElement.parentElement.querySelector(`div[data-coords="(${j}, ${k})"]`);
									if (!element) return;
									element.classList.remove("hovered");
								}
							}
						});
	
						gridElement.addEventListener("click", () =>
						{
							if (board.placeShip(j, i, lengths[l], vertical, true) === true)
							{
								board.placeShip(j, i, lengths[l], vertical, true);
								if (!vertical)
								{
									for (let k = j; k < lengths[l] + j; k++)
									{
										gridElement.parentElement.querySelector(`div[data-coords="(${k}, ${i})"]`).classList.remove("hovered");
									}
								} else
								{
									for (let k = i; k < lengths[l] + i; k++)
									{
										gridElement.parentElement.querySelector(`div[data-coords="(${j}, ${k})"]`).classList.remove("hovered");
									}
								}
								l++;
								if (l === 5) endSetUp(domBoard, board, resolve, l);
							}
						});
					}
				}
			}	
		});
	};

	// eslint-disable-next-line no-unused-vars
	const endSetUp = (domBoard, board, resolve, l) =>
	{
		domBoard.style.pointerEvents = "none";
		domBoard.parentElement.querySelector("#toggle").remove();
		
		(() =>
		{
			if (document.querySelector(".buttons-container")) 
				return document.querySelector(".buttons-container").style = "";
			const div = document.createElement("div");
			div.classList.add("buttons-container");

			const start = document.createElement("h1");
			start.textContent = "Start Game";
			start.style.cursor = "pointer";
			div.appendChild(start);

			const reset = document.createElement("h1");
			reset.textContent = "Reset";
			reset.style.cursor = "pointer";
			div.appendChild(reset);

			domBoard.parentElement.appendChild(div);

			start.addEventListener("click", () =>
			{
				div.remove();
				resolve();
			});

			reset.addEventListener("click", () =>
			{
				l = 0;
				domBoard.style.pointerEvents = "initial";
				domBoard.innerHTML = "";
				createBoard(domBoard, board, true);
				div.style.display = "none";
				board.reset();
			});
		})();
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
