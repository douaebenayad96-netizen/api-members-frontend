import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MembersList from './components/MembersList';
import MemberForm from './components/MemberForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<MembersList />} />
                    <Route path="/add" element={<MemberForm />} />
                    <Route path="/edit/:id" element={<MemberForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;