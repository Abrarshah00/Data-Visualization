import './App.css';
import BarChart from './charts/BarChart';
import ScatterChart from './charts/ScatterChart';

function App() {
  return (
    <div id='chart-view-container'>
      <ScatterChart />
      <BarChart />
    </div>
  );
}

export default App;

