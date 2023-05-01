from flask import Flask, request, json
from flask_cors import CORS
import psycopg2


app = Flask(__name__)
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
        queryDatabase(gene, disease, mutation)
        return data
        #return json.dumps({'gene': request.json['gene']})
        #SELECT EXISTS (SELECT 1 from (SELECT DISTINCT gd."Gene", gd."Disease", gm."Mutation" FROM gd INNER JOIN gm ON gd."Gene" = gm."Gene" AND gm."prediction" = 1 INNER JOIN dm ON gd."Disease" = dm."Disease" AND gm."Mutation" = dm."Mutation" AND dm."prediction" = 1 WHERE gd."prediction" = 1) as res where res."Gene"='B-Raf' and res."Disease"='tumours' and res."Mutation"='V600E')
    

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
    


if __name__ == '__main__':
    app.run()



