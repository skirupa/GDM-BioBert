import React, { useState } from 'react';

const Data = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);
    // const [buttonResponse, setButtonResponse] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:5000/fileUpload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUploadStatus(true);
            })
            .catch(error => console.error(error));
    };

    // const handleClick = () => {
    //     fetch('http://localhost:5000/triggerNotebooks', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ message: 'Button Clicked' })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.message);
    //             // setButtonResponse(data.message);
    //         })
    //         .catch(error => console.error(error));
    // };

    return (
        <div className="container p-5 mt-4" style={{ justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', backgroundColor: '#edf2f4' }}>
            <h1 style={{ textAlign: "center" }}>DATABASE ENRICHER</h1>
            <form onSubmit={handleSubmit} method='POST' style={{ textAlign: 'left', marginTop: '100px' }}>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label" style={{}}>Upload a text file</label>
                    <input type="file" className="form-control" id="file" accept=".txt" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {uploadStatus && <p> File upload complete! </p>}
            </form>
            {/* <button onClick={handleClick} className="btn btn-primary" style={{ textAlign: 'left', marginTop: '100px' }}>Trigger Notebook</button> */}
        </div>
    );
};

export default Data;

