import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <h1 className='font-weight-light display-1 text-center'>
                GDM BioBert Relation Extraction
            </h1>
        </div>
    );
};
const Home = () => {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center">Welcome!</h1>
                        <p className="text-center">Please choose an option:</p>
                        <div className="d-flex justify-content-between">
                            <button className="btn-lg">
                                <Link to='/RelationExtraction'>Relation Extraction</Link>
                            </button>
                            <button className="btn-lg">
                                <Link to='/DatabasePopulate'>Database Population</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;