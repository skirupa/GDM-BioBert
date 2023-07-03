import React, { useState, useEffect } from 'react';

const RelExt = () => {
    const [formData, setFormData] = useState({
        gene: '',
        disease: '',
        mutation: '',
    });
    const [isPresent, setIsPresent] = useState(null);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/displayTable', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setTableData(data);
            })
            .catch(error => console.log(error))
    }, []);

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
            //mode: 'cors',
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
        <div className="container p-5 mt-4" style={{ justifyContent: 'center', alignItems: 'center', height: '700vh', textAlign: 'center', backgroundColor: '#edf2f4' }}>
            <h1 style={{ textAlign: "center" }}>RELATION EXTRACTOR</h1>
            <div className="container p-4 mt-4" style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left' }}>
                <form action='' onSubmit={handleSubmit} method='POST'>
                    <div class="form-group mt-4" style={{ fontWeight: 'bold', fontFamily: '' }}>
                        <label for="formGroupExampleInput">GENE</label>
                        <input type="text" className='form-control' placeholder='Enter Gene here' name='gene' value={formData.gene} onChange={handleInputChange} />
                    </div>
                    <div class="form-group mt-4">
                        <label for="formGroupExampleInput">DISEASE</label>
                        <input type="text" className='form-control' placeholder='Enter Disease here' name='disease' value={formData.disease} onChange={handleInputChange} />
                    </div>
                    <div class="form-group mt-4">
                        <label for="formGroupExampleInput">MUTATION</label>
                        <input type="text" className='form-control' placeholder='Enter Mutation here' name='mutation' value={formData.mutation} onChange={handleInputChange} />
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg" data-toggle="button" aria-pressed="false" autocomplete="off">Find relation status</button>
                </form>
                {isPresent !== null && (
                    <div className="justify-content-center mt-4">
                        {isPresent ?
                            <button type="button" className="btn btn-success btn-lg btn-block" data-toggle="button" aria-pressed="false" autocomplete="off">
                                <span class="label label-success">RELATION FOUND</span>
                            </button>
                            :
                            <button type="button" className="btn btn-danger btn-lg btn-block" aria-pressed="true" data-dismiss="alert" aria-label="Close">
                                <span class="label label-danger">RELATION NOT FOUND</span>
                            </button>
                        }
                    </div>
                )}
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Gene</th>
                            <th>Disease</th>
                            <th>Mutation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.Gene}</td>
                                <td>{row.Disease}</td>
                                <td>{row.Mutation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default RelExt;