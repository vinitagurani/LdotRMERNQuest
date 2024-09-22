import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import UserForm from './UserForm/UserForm';


function App() {
    return (
        <Router>
            <div>
                <h1 style={{textAlign: "center"}}>User Management App</h1>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UserForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
