import React, { useState } from 'react';

const RelExt = () => {
    const [formData, setFormData] = useState({
        gene: '',
        disease: '',
        mutation: '',
    });
    const [isPresent, setIsPresent] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setIsPresent(data.isPresent)
            })
            .catch(error => console.log(error))
    };

    return (
        <div className='mt=4'>
            <h1 className='font-weight-light display-1 text-center'>
                Relation Extraction
            </h1>
            <form action='' onSubmit={handleSubmit} method='POST'>
                <div className='form-row'>
                    <div className='col'>
                        <input type="text" className='form-control' placeholder='Enter Gene here' name='gene' value={formData.gene} onChange={handleInputChange} />
                    </div>
                    <div className='col'>
                        <input type="text" className='form-control' placeholder='Enter Disease here' name='disease' value={formData.disease} onChange={handleInputChange} />
                    </div>
                    <div className='col'>
                        <input type="text" className='form-control' placeholder='Enter Mutation here' name='mutation' value={formData.mutation} onChange={handleInputChange} />
                    </div>
                    <button className="btn btn primary" type='submit'>Find</button>
                </div>

            </form>

            {isPresent !== null && (
                <div className="alert alert-dismissible fade show mt-3" role="alert">
                    {isPresent ? "RELATION FOUND" : "RELATION NOT FOUND"}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}


        </div>
    );
};

export default RelExt;