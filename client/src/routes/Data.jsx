import React, { useState } from 'react';

const Data = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);


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
        </div>
    );
};

export default Data;