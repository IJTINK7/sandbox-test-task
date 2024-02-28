import {requestAnimals, requestAnimalsWithError, Animal, Query} from "./api";
import Requirements from "./Requirements";
import "./index.css";
import {useState} from "react";

// Примеры вызова функций, в консоли можно увидеть возвращаемые результаты
requestAnimals({animal: "", amount: "", limit: 4, offset: 0}).then(
	console.log
);
requestAnimalsWithError({animal: "", amount: "", limit: 4, offset: 0}).catch(
	console.error
);

export default function App() {
	const [animalList, setAnimalList] = useState<Animal[]>([{ animal: "Cat", id: 0, amount: 11 }, { animal: "Dog", id: 1, amount: 7 }])
	return (
		<>
			<Requirements/>
            <div className={"animalList"}>
                    <div className={"animalList__inputsBlock"}>
                        <input type="text" placeholder={"Animal"} className={"animalList__inputsBlock__input"}/>
                        <input type="text" placeholder={"Amount"} className={"animalList__inputsBlock__input"}/>
                    </div>
                    <div className={"animalList__interface"}>
                        <p>By page:</p>
                        <select name="user_profile_color_1">
                            <option value="1" onBlur={()=>setAnimalList([{ animal: "Dog", id: 100, amount: 100 }])}>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
                        </select>
                        <button>prev</button>
                        <p>page: 1</p>
                        <button>next</button>
                    </div>
                    <div>{animalList.map(el=>{
						return (
							<div>{el.animal}, {el.amount}</div>
						)
					})}</div>
            </div>
		</>
	);
}
