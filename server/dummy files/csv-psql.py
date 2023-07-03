import psycopg2
  
conn = psycopg2.connect(database="gdmbiobert",
                        user='postgres', password='sinkiru', 
                        host='127.0.0.1', port='5432'
)
  
conn.autocommit = True
cursor = conn.cursor()

sql_dm_1 = '''CREATE TABLE DM(index TEXT NOT NULL,\
sentence TEXT NOT NULL,\
Disease TEXT NOT NULL,\
Mutation TEXT NOT NULL, prediction TEXT NOT NULL);'''

  
cursor.execute(sql_dm_1)

#to store a csv into psql table
f = open('../biobert-pytorch/relation-extraction/outputDM/final_DM_output.tsv')
cursor.copy_from(f, 'dm', sep='\t')
f.close()


testing = '''select * from DM;'''
cursor.execute(testing)
print("printing records from database DM...")
for i in cursor.fetchall():
    print(i)

conn.commit()
conn.close()
