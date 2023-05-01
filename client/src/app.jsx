import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import RelExt from './routes/RelExt';


const App = () => {
    return <div className='container'>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/RelationExtraction' element={<RelExt />} />
            </Routes>
        </Router>
    </div>;
};

export default App;