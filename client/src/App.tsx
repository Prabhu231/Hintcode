import Problem from './pages/Problems';
import Home from './pages/Homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/problem/:id" element={<Problem />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
