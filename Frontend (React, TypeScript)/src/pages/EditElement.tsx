import { useEffect, useState } from "react";
import { updatePerson, getPerson } from "../api/PersonAPI";
import { useNavigate, useParams } from "react-router-dom";

export default function EditElement() {
  const { id: personId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [firstLastname, setFirstLastname] = useState("");
  const [secondLastname, setSecondLastname] = useState("");
  const [curp, setCurp] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(false);
  const [secondName, setSecondName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonData = async () => {
      const person = await getPerson(Number(personId));
      if (person) {
        setFirstName(person.first_name || "");
        setSecondName(person.second_name || "");
        setFirstLastname(person.first_lastname || "");
        setSecondLastname(person.second_lastname || "");
        setCurp(person.curp || "");
        setGender(person.gender || "");
        setStatus(person.status || false);
      }
    };

    fetchPersonData();
  }, [personId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPerson = {
      first_name: firstName,
      second_name: secondName || null,
      first_lastname: firstLastname,
      second_lastname: secondLastname,
      curp: curp,
      gender: gender,
      status: status,
    };

    try {
      await updatePerson(Number(personId), updatedPerson);
      navigate("/people");
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const [first, second = ""] = input.split(" ");
    setFirstName(first);
    setSecondName(second);
  };

  return (
    <>
      <main className="col-lg-10 d-block mt-3" id="main">
        <div id="title" className="mt-lg-5 mt-3">
          <h1
            style={{ fontSize: "60px", color: "#4E5283", fontWeight: "bold" }}
            className="offset-1"
          >
            EDITAR EVALUADO
          </h1>
        </div>
        <hr className="offset-1" />
        <form action="" id="form" className="mt-lg-5" onSubmit={handleSubmit}>
          <div className="mb-lg-5 row offset-1 offset-lg-0 me-5 me-lg-0">
            <div className="col-lg-3 offset-lg-1">
              <label
                className="form-label"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Nombre/s
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre/s..."
                value={firstName + (secondName ? ` ${secondName}` : "")}
                onChange={handleNameChange}
              />
            </div>
            <div className="col-lg-3">
              <label
                className="form-label"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Primer Apellido
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Primer Apellido..."
                value={firstLastname}
                onChange={(e) => setFirstLastname(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <label
                className="form-label"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Segundo Apellido
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Segundo Apellido..."
                value={secondLastname}
                onChange={(e) => setSecondLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-lg-5 row offset-1 offset-lg-0 me-5 me-lg-0">
            <div className="col-lg-3 offset-lg-1">
              <label
                className="form-label"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                CURP
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="CURP..."
                value={curp}
                onChange={(e) => setCurp(e.target.value)}
              />
            </div>
            <div className="col-lg-3">
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Estatus</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="grad"
                  checked={status === true}
                  onChange={() => setStatus(true)}
                />
                <label className="form-check-label" htmlFor="grad">
                  Graduado
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="status"
                  id="reprobado"
                  checked={status === false}
                  onChange={() => setStatus(false)}
                />
                <label className="form-check-label" htmlFor="reprobado">
                  No Graduado
                </label>
              </div>
            </div>
            <div className="col-lg-3">
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Género</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gen"
                  id="masc"
                  checked={gender === "M"}
                  onChange={() => setGender("M")}
                />
                <label className="form-check-label" htmlFor="masc">
                  Masculino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gen"
                  id="fem"
                  checked={gender === "F"}
                  onChange={() => setGender("F")}
                />
                <label className="form-check-label" htmlFor="fem">
                  Femenino
                </label>
              </div>
            </div>
          </div>
          <div className="row mt-5 mt-lg-0">
            <div
              id="buttons"
              className="col-lg-3 offset-lg-7 d-flex gap-5 justify-content-center"
            >
              <button
                id="cancel"
                className="btn d-flex align-items-center justify-content-center"
                type="button"
                onClick={() => navigate("/people")}
              >
                Cancelar
              </button>
              <button
                id="submit"
                className="btn d-flex align-items-center justify-content-center"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
