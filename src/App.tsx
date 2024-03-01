import { requestAnimals, requestAnimalsWithError, Animal, Query } from "./api";
import Requirements from "./Requirements";
import "./index.css";
import { ChangeEvent, useEffect, useState } from "react";
// Примеры вызова функций, в консоли можно увидеть возвращаемые результаты
requestAnimalsWithError({ animal: "", amount: "", limit: 4, offset: 0 }).catch(
	console.error
);

export default function App() {
	// states
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [animalList, setAnimalList] = useState<Animal[]>([]);
	const [disablePrevButton, setDisablePrevButton] = useState<boolean>(true);
	const [disableNextButton, setDisableNextButton] = useState<boolean>(false);

	const [baseQuery, setBaseQuery] = useState<Query>({
		animal: "",
		amount: "",
		offset: 0,
		limit: 4,
	});

	// effects
	useEffect(() => {
		setIsLoading(true);
		setDisablePrevButton(true);
		setDisableNextButton(true);

		requestAnimals({ ...baseQuery, limit: baseQuery.limit + 1 })
			.then((res) => {
				const currentPage = baseQuery.offset ? baseQuery.offset / baseQuery.limit + 1 : 1;
				setPage(currentPage);

				if (currentPage !== 1) {
					setDisablePrevButton(false);
				}

				if (res.length < baseQuery.limit + 1) {
					setAnimalList(res);
				} else {
					setDisableNextButton(false);
					setAnimalList(res.slice(0, -1));
				}
				setIsLoading(false);
			});
	}, [baseQuery]);

	// handlers
	const clickPrevHandler = () => {
		setBaseQuery((q) => ({ ...q, offset: q.limit * (page - 2) }));
	};

	const clickNextHandler = () => {
		setBaseQuery((q) => ({ ...q, offset: q.limit * page }));
	};

	const changeLimitHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = Number(e.currentTarget.value);
		setBaseQuery((q) => ({
			...q,
			offset: 0,
			limit: value,
		}));
	};

	const handleFilterChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: string
	) => {
		const value = e.currentTarget.value;
		setBaseQuery((q) => ({ ...q, offset: 0, [key]: value }));
	};

	// return
	return (
		<>
			<div className={"animalList"}>
				<div className={"animalList__inputsBlock"}>
					<input
						type="text"
						placeholder={"Animal"}
						className={"animalList__inputsBlock__input"}
						onChange={(e) => handleFilterChange(e, "animal")}
					/>
					<input
						type="text"
						placeholder={"Amount"}
						className={"animalList__inputsBlock__input"}
						onChange={(e) => handleFilterChange(e, "amount")}
					/>
				</div>
				<div className={"animalList__interface"}>
					<p>By page:</p>
					<select
						name="user_profile_color_1"
						onChange={changeLimitHandler}
						defaultValue={baseQuery.limit}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
					</select>
					<button onClick={clickPrevHandler} disabled={disablePrevButton}>
						prev
					</button>
					<p>page: {page}</p>
					<button onClick={clickNextHandler} disabled={disableNextButton}>
						next
					</button>
				</div>
				<div>
					{isLoading ? (
						<p>Loading...</p>
					) : animalList.length < 1 ? (
						<p>Animals not found</p>
					) : (
						<ul>
							{animalList.map((el) => {
								return (
									<li key={el.id}>
										{el.animal}, {el.amount}
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>
			<Requirements />
		</>
	);
}