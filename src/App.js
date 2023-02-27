import { Agent } from "./Pages/Agent";
import { Bso } from "./Pages/Bso";
import { FinPolitic } from "./Pages/FinPolitic";
import { InsCompany } from "./Pages/InsCompany";
import { Sail } from "./Pages/Sail";
import { Statistic } from "./Pages/Statistic";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Search } from "./components/Search.jsx";
import { AgentCard } from "./Pages/AgentCard";

function App() {
    return (
        <div className="App">
            <Router>
                <Search />
                <Header />
                <Routes>
                    <Route path="/Agent" element={<Agent />} />
                    <Route path="/AgentCard/:id" element={<AgentCard />} />
                    <Route path="/Bso" element={<Bso />} />
                    <Route path="/FinPolitic" element={<FinPolitic />} />
                    <Route path="/InsCompany" element={<InsCompany />} />
                    <Route path="/Sail" element={<Sail />} />
                    <Route path="/Statistic" element={<Statistic />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
