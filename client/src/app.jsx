import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import RelExt from './routes/RelExt';
import Data from './routes/Data';


const App = () => {
    return <div className='container'>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/RelationExtraction' element={<RelExt />} />
                <Route path='/DatabasePopulate' element={<Data />} />
            </Routes>
        </Router>
    </div>;
};

export default App;