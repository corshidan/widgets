import React, { useState } from 'react';
import './index.css';
import wallyWidgets from './stickeeTask';
export default function PackFinder() {
	const [output, setOutput] = useState(null);
	const [packs, setPacks] = useState([250, 500, 1000, 2000, 5000]);
	const [newPack, setNewPack] = useState(0);
	const [amount, setAmount] = useState(0);

	function removePack(packValue) {
		const newPacks = packs.filter((pack) => pack !== packValue);
		setPacks(newPacks);
	}
	function onInputChange(newInput) {
		console.log(newInput);
		setNewPack(newInput);
	}
	function addPack(packValue) {
		if (packs.includes(packValue)) {
			return;
		}
		const newPacks = [...packs, packValue].sort((a, b) => a - b);
		setPacks(newPacks);
	}
	function getPacks(widgets, packsArray) {
		const response = wallyWidgets(widgets, packsArray);
		setOutput(response);
	}
	const arr = [
		[2000, 1],
		[1000, 1],
		[500, 1],
		[250, 2],
	];
	return (
		<div className="container">
			<div className="addPacks">
				<label className="addPacksLabel">Add a new pack: </label>
				<input
					type="number"
					placeholder="New pack size !"
					onChange={(e) => onInputChange(e.target.value)}
				/>
				<button onClick={() => addPack(+newPack)}>Add pack</button>
			</div>
			<div className="packsSection">
				<p>Available pack sizes:</p>
				<ul>
					{packs.map((pack, i) => {
						return (
							<li key={i}>
								{pack}
								<span onClick={() => removePack(pack)}>❌</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="widgetInputSection">
				<h4>Find how many packs to send </h4>
				<input
					type="text"
					placeholder="How many widgets ?"
					onChange={(e) => {
						console.log(e.target.value);
						setAmount(+e.target.value);
					}}
				/>
				<button onClick={() => getPacks(amount, packs)}>Find</button>
			</div>
			<div className="displaySection">
				{output.reverse().map((pack, i) => {
					return (
						<li key={i}>
							{pack[1]} x {pack[0]}
						</li>
					);
				})}
			</div>
		</div>
	);
}
