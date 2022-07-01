import './App.css';
import CreateWord from './components/CreateWord'
import CreateQuestion from './components/CreateQuestion';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddExample from './components/AddExample';
import CreateGrammar from './components/CreateGrammar';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/createWord" element={<CreateWord/>} />
        <Route exact path="/createQuestion" element={<CreateQuestion/>} />
        <Route exact path="/addExample" element={<AddExample/>} />
        <Route exact path="/createGrammar" element={<CreateGrammar/>} />
        <Route exact path="/createPost" element={<CreatePost/>} />

      </Routes>
    </Router>
  );
}

export default App;
