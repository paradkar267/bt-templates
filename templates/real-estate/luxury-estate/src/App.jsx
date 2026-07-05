import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import AgentProfile from './pages/AgentProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listings" element={<Listings />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route path="agent/:id" element={<AgentProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
