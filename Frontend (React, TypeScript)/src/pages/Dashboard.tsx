import LineGraduatesChart from "../components/LineGraduatesChart";
import PieGenderChart from "../components/PieGenderChart";
import "../styles/Dashboard.css";
import HeaderDashboard from "../components/HeaderDashboard";
import { useState, useEffect } from "react";
import {
  getStatusPercentageByPopulation,
  getLevelAlert,
  getTotalPeople,
  getGenderStats,
} from "../api/PersonAPI";
import { Zone, Population } from "my-types";

type StatusPercentage = {
  name: string;
  graduados: number;
  noGraduados: number;
}[];

type GenderStats = {
  name: string;
  value: number;
}[];

type Alert = {
  level: string;
  color: string;
};

export default function Dashboard() {
  const [currPop, setCurrPop] = useState<number>(1);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedPopulation, setSelectedPopulation] =
    useState<Population | null>(null);
  const [status, setStatus] = useState<StatusPercentage>([
    { name: "-", graduados: 0, noGraduados: 0 },
  ]);
  const [level, setLevel] = useState<Alert>({
    level: "",
    color: "",
  });
  const [total, setTotal] = useState<number>(0);
  const [genderStats, setGenderStats] = useState<GenderStats>([
    {
      name: "",
      value: 0,
    },
    {
      name: "",
      value: 0,
    },
  ]);

  useEffect(() => {
    getStatusPercentageByPopulation(currPop).then((data: StatusPercentage) => {
      setStatus(data);
    });
    getLevelAlert(currPop).then((data: Alert) => {
      setLevel(data);
    });
    getTotalPeople(currPop).then((data: number) => {
      setTotal(data);
    });
    getGenderStats(currPop).then((data: GenderStats) => {
      setGenderStats(data);
    });
  }, [currPop]);

  const handleSelectionUpdate = (
    zone: Zone | null,
    population: Population | null
  ) => {
    setSelectedZone(zone);
    setSelectedPopulation(population);
  };

  return (
    <div className="dashboard-container">
      <HeaderDashboard
        currPop={currPop}
        setCurrPop={setCurrPop}
        onSelectionUpdate={handleSelectionUpdate}
      />

      <div className="dashboard-content">
        <div className="row">
          <div className="col-lg-3 d-flex flex-column gap-3 mt-4">
            <div
              className="card flex-fill shadow"
              style={{ backgroundColor: "#95CBF8" }}
            >
              <div
                className="card-body d-lg-flex  flex-column justify-content-lg-center align-items-lg-center text-center"
                style={{ color: "#486883" }}
              >
                <div>
                  <h5>Zona</h5>
                  <div style={{ color: "#FFFFFF" }}>
                    <p>
                      {selectedZone
                        ? `${selectedZone.name}, ${selectedZone.state}`
                        : selectedPopulation?.zone
                        ? `${selectedPopulation.zone.name}, ${selectedPopulation.zone.state}`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card flex-fill shadow"
              style={{ backgroundColor: "#A8ADE8" }}
            >
              <div
                className="card-body d-lg-flex flex-column justify-content-center align-items-center text-center"
                style={{ color: "#4D528A" }}
              >
                <h5 className="mb-2">Población</h5>
                <div className="d-flex justify-content-center gap-2">
                  <p className="mb-0 text-white">Edad:</p>
                  <p className="mb-0 text-white">
                    {selectedPopulation ? selectedPopulation.age : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9 mt-4">
            <div className="card shadow">
              <div className="card-body">
                <LineGraduatesChart data={status} />
              </div>
            </div>
          </div>
        </div>

        {/* SECOND ROW*/}
        <div className="row">
          <div className="col-lg-3 mt-4">
            <div
              className="card shadow h-100"
              style={{ backgroundColor: level.color, color: "#FFFFFF" }}
            >
              <div className="card-body d-lg-flex justify-content-lg-center align-items-lg-center text-center">
                <h5 id="Alerta">{level.level}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mt-4">
            <div className="card shadow h-100">
              <div className="card-body d-lg-flex justify-content-lg-center align-items-lg-center text-center">
                <div id="total-style">
                  <div id="text">
                    <h5
                      style={{
                        fontSize: "32px",
                        fontWeight: "bold",
                        marginBottom: "0",
                      }}
                    >
                      TOTAL DE
                    </h5>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {" "}
                      EVALUADOS
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "64px",
                      fontWeight: "bold",
                      color: "#95CBF8",
                    }}
                  >
                    {total}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4">
            <div className="card shadow h-100">
              <div className="card-body">
                <div>
                  <PieGenderChart data={genderStats} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
