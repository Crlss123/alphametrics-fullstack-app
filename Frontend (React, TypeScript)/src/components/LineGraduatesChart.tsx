import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = [{ name: "-", graduados: 85, noGraduados: 15 }];

type Props = {
  data: {
    name: string;
    graduados: number;
    noGraduados: number;
  }[];
};

export default function LineGraduatesChart({ data }: Props) {
  return (
    <div className="mb-4">
      <div className="card-body">
        <h5
          className="text-center"
          style={{ fontSize: "32px", fontWeight: "bold" }}
        >
          TASA DE GRADUACIÓN
        </h5>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="graduados" fill="#49D49D" name="Graduados" />
            <Bar dataKey="noGraduados" fill="#D62828" name="No Graduados" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
