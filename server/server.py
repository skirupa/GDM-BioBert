from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

import nbformat
from nbconvert.preprocessors import ExecutePreprocessor

app = Flask(__name__)
# app.config['UPLOAD_FOLDER'] = '../project-sample'
CORS(app)

@app.route('/submit', methods=['POST', 'OPTIONS'])
def submit_form():
    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return ('', 204, headers)
    else:
        data = request.get_json()
        gene = data.get('gene')
        disease = data.get('disease')
        mutation = data.get('mutation')
        print("Gene: ",gene)
        print("Disease: ",disease)
        print("Mutation: ",mutation)
        isPresent = queryDatabase(gene, disease, mutation)
        response = {"isPresent": isPresent}
        return response
        #return json.dumps({'gene': request.json['gene']})
        #SELECT EXISTS (SELECT 1 from (SELECT DISTINCT gd."Gene", gd."Disease", gm."Mutation" FROM gd INNER JOIN gm ON gd."Gene" = gm."Gene" AND gm."prediction" = 1 INNER JOIN dm ON gd."Disease" = dm."Disease" AND gm."Mutation" = dm."Mutation" AND dm."prediction" = 1 WHERE gd."prediction" = 1) as res where res."Gene"='B-Raf' and res."Disease"='tumours' and res."Mutation"='V600E')

@app.route('/displayTable', methods=['POST'])
def display():
    conn = psycopg2.connect(database="gdmbiobert",
                        user='postgres', password='sinkiru', 
                        host='127.0.0.1', port='5432'
    )
    
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute('''SELECT DISTINCT gd."Gene", gd."Disease", gm."Mutation" FROM gd INNER JOIN gm ON gd."Gene" = gm."Gene" 
        AND gm."prediction" = 1 INNER JOIN dm ON gd."Disease" = dm."Disease" AND gm."Mutation" = dm."Mutation" 
        AND dm."prediction" = 1 WHERE gd."prediction" = 1''')
    data = cursor.fetchall()
    # Convert data to a list of dictionaries
    # Assuming you have column names in a variable called 'columns'
    columns = [desc[0] for desc in cursor.description]
    results = []
    for row in data:
        results.append(dict(zip(columns, row)))

    # Return the data as JSON
    return jsonify(results)

def queryDatabase(gene, disease, mutation):
    conn = psycopg2.connect(database="gdmbiobert",
                        user='postgres', password='sinkiru', 
                        host='127.0.0.1', port='5432'
    )
    
    conn.autocommit = True
    cursor = conn.cursor()

    (g,d,m) = (gene,disease,mutation)
    cursor.execute('''SELECT EXISTS (SELECT 1 from (SELECT DISTINCT gd."Gene", gd."Disease", gm."Mutation" FROM gd INNER JOIN gm ON gd."Gene" = gm."Gene" AND gm."prediction" = 1 INNER JOIN dm ON gd."Disease" = dm."Disease" AND gm."Mutation" = dm."Mutation" AND dm."prediction" = 1 WHERE gd."prediction" = 1) as res where res."Gene"=%s and res."Disease"=%s and res."Mutation"=%s)''',(g,d,m))

    isPresent = cursor.fetchone()[0]
    
    if isPresent:
        print("Triplet exists in the table")
    else:
        print("Triplet does not exists in the table!!!")

    conn.close()
    return isPresent    

@app.route('/fileUpload', methods=['POST'])
def process_file():
    file = request.files['file']
    filename = "pmcid.txt"
    #app.config['UPLOAD_FOLDER'],
    file.save(os.path.join(filename))
    return jsonify({'message': 'File saved successfully.'})

# @app.route('/triggerNotebooks', methods=['POST'])
# def triggerNotebooks():
#     print("INSIDE FUNC")
#     data = request.get_json()
#     response = data.get('message', '')
#     # Run the notebook
#     run_notebook('Disease-Mutation.ipynb')
#     run_notebook('Gene-Mutation.ipynb')
#     run_notebook('Gene-Disease.ipynb')
#     return jsonify(response)

# def run_notebook(notebook_path):
#     # Load the notebook
#     with open("Disease-Mutation.ipynb") as f:
#         notebook = nbformat.read(f, as_version=4)
#     with open("Gene-Mutation.ipynb") as f1:
#         notebook = nbformat.read(f1, as_version=4)
#     with open("Gene-Disease.ipynb") as f2:
#         notebook = nbformat.read(f2, as_version=4)

#     # Configure the execution parameters
#     execute_config = {
#         'timeout': 4000,  # Maximum execution time (in seconds)
#         'kernel_name': 'python3',  # Kernel name
#     }
#     # Create an execution notebook_path
#     execution_engine = ExecutePreprocessor(**execute_config)
#     # Execute the notebook
#     execution_engine.preprocess(notebook, {'metadata': {'path': './'}})
#     # Save the executed notebook
#     output_path = notebook_path.replace('.ipynb', '_executed.ipynb')
#     with open(output_path, 'w', encoding='utf-8') as f:
#         nbformat.write(notebook, f)
#     with open(output_path, 'w', encoding='utf-8') as f1:
#         nbformat.write(notebook, f1)
#     with open(output_path, 'w', encoding='utf-8') as f2:
#         nbformat.write(notebook, f2)
    

if __name__ == '__main__':
    app.run(debug=True)

