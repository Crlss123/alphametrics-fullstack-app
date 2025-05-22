import HeaderList from "../components/HeaderList";
import List from "../components/List";
import { getPeopleByPopulation, deletePerson } from "../api/PersonAPI";
import { useEffect, useState } from "react";
import { Person } from "my-types";

export default function ListPerson() {
  const [people, setPeople] = useState<Person[]>([]);
  const [currPop, setCurrPop] = useState<number>(1);

  const deleteHandler = async (id: number) => {
    await deletePerson(id);
    const updatedPeople = await getPeopleByPopulation(currPop);
    setPeople(updatedPeople);
  };

  useEffect(() => {
    getPeopleByPopulation(currPop).then((data: Person[]) => setPeople(data));
  }, [currPop]);

  return (
    <div className="list-container">
      <HeaderList currPop={currPop} setCurrPop={setCurrPop} />
      <div className="list-content">
        <List people={people} onDelete={deleteHandler} />
      </div>
    </div>
  );
}
