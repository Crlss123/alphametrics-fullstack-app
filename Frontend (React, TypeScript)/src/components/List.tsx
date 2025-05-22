import { useState } from "react";
import { Person } from "my-types";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

type Props = {
  people: Person[];
  onDelete: (id: number) => void;
};

export default function List({ people, onDelete }: Props) {
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <div id="tabla" className="mt-3 me-5">
        <table className="table table-hover text-center align-middle">
          <thead>
            <tr className="table-active">
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">CURP</th>
              <th scope="col">Genero</th>
              <th scope="col">Estatus</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {people.map((people, index) => (
              <tr className="" key={index}>
                <th scope="row">{people.id}</th>
                <td>
                  {[
                    people.first_name,
                    people.second_name !== "null" ? people.second_name : "",
                    people.first_lastname,
                    people.second_lastname,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </td>

                <td>{people.curp}</td>
                <td>{people.gender}</td>
                <td>{people.status ? "Graduado" : "No Graduado"}</td>
                <th scope="row">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#deletePersonModal"
                    style={{ border: "0", backgroundColor: "transparent" }}
                    onClick={() => setPersonToDelete(people)}
                  >
                    <img
                      src="img/trash_icon.png"
                      alt="delete"
                      id="delete-icon"
                    />
                  </button>
                </th>
                <th scope="row">
                  <button
                    style={{ border: "0", backgroundColor: "transparent" }}
                    onClick={ () => navigate(`/edit_person/${people.id}`)}
                  >
                    <img src="img/edit_icon.png" alt="edit" id="edit-icon" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal person={personToDelete} onDeleteConfirm={() => {
        if (personToDelete) onDelete(personToDelete.id);
      }} />
    </>
  );
}
