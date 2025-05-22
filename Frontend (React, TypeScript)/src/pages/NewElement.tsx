import { useEffect, useState } from "react";
import { createPerson, getAllPopulations } from "../api/PersonAPI";
import { Population } from "my-types";
import { useNavigate } from "react-router-dom";

export default function NewElement() {
  const [firstName, setFirstName] = useState("");
  const [firstLastname, setFirstLastname] = useState("");
  const [secondLastname, setSecondLastname] = useState("");
  const [curp, setCurp] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(false);
  const [secondName, setSecondName] = useState("");
  const [populations, setPopulations] = useState<Population[]>([]);
  const [id, setId] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPopulations().then((data: Population[]) => setPopulations(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = {
      first_name: firstName,
      second_name: secondName || null,
      first_lastname: firstLastname,
      second_lastname: secondLastname,
      curp: curp,
      gender: gender,
      status: status,
      population_id: id,
    };
    await createPerson(newPerson);
    navigate("/people");
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
            NUEVO EVALUADO
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
                  onChange={() => setGender("F")}
                />
                <label className="form-check-label" htmlFor="fem">
                  Femenino
                </label>
              </div>
            </div>
          </div>
          <div className="row offset-1 offset-lg-0 me-5 me-lg-0">
            <div className="col-lg-3 offset-lg-1">
              <label
                className="form-label"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Poblacion
              </label>
              <br />
              <select
                name="population"
                id="population"
                className="w-100"
                style={{ height: "40px" }}
                onChange={(e) => {
                  setId(Number(e.target.value));
                }}
              >
                {populations.map((population, index) => (
                  <option
                    key={index}
                    value={population.id}
                  >{`Zona: ${population.zone.name}, ${population.zone.state} ,ID: ${population.id}, Edad: ${population.age} anios`}</option>
                ))}
              </select>
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
                Crear
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
