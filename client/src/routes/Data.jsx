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
        <form onSubmit={handleSubmit} method='POST'>
            <div className="mb-3">
                <label htmlFor="file" className="form-label">Upload a text file</label>
                <input type="file" className="form-control" id="file" accept=".txt" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {uploadStatus && <p> File upload complete! </p>}
        </form>
    );
};

export default Data;