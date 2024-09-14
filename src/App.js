import { Route, Routes } from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Todo/>}/>
      </Routes>
    </div>
  );
}

export default App;
