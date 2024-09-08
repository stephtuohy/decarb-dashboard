"use client"
import { Bar, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register chart types
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);



const Dashboard = () => {
  // Fake data for Bar Chart
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#76ca6f", 
      },
    ],
  };

  // Fake data for Scatter Plot
  const scatterData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 },
        ],
        backgroundColor: "#76ca6f", 
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Data",
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Scatter Plot Example",
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
    },
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Bar Chart</h2>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Scatter Plot Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Scatter Plot</h2>
          <Scatter data={scatterData} options={scatterOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
