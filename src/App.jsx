import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Tweets from './components/Tweets';
import Home from 'pages/Home';

export const App = () => {
  return (
    <Router basename="/tech_task">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tweets/:id" element={<Tweets />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};