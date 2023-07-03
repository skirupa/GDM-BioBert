import pandas as pd
import requests

def main():
    df = pd.read_csv('pmid_list_sample.txt', header=None)
    l = list(df[0])
    #every 200 in a list
    pmid_sets = []
    for i in range(0, len(l), 200):
        sublist = l[i:i+200]
        pmid_sets.append(sublist)
    #f = open('listOfPMCIDs.txt', 'w')
    #for sub in pmid_sets:
        #f.write(str(sub))
        #f.write('\n')
    
    url = 'https://www.ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0'
    params = {
        'tool': 'python-script',
        #'email': 'your-email@example.com',
        'format': 'json'
    }
    # Loop over the sets of PMIDs and send the requests
    for pmids in pmid_sets:
        params['ids'] = ','.join(map(str, pmids))
        response = requests.post(url, data=params)
        print(response.content)
        # data = response.json()['records']
        
        # # Open a CSV file for writing
        # with open('PMCidList.csv', 'a', newline='', encoding='utf-8') as f:
        #     writer = csv.writer(f)
            
        #     # Write the header row if this is the first iteration
        #     if pmids == pmid_sets[0]:
        #         header = ['pmid', 'pmcid', 'doi', 'doi_url']
        #         writer.writerow(header)
            
        #     # Write the data rows
        #     for record in data:
        #         row = [record['pmid'], record['pmcid'], record['doi'], record['doi_url']]
        #         writer.writerow(row)
    
main()

#https://www.ncbi.nlm.nih.gov/pmc/tools/idconv/ : site to convert the pmid to pmcid
