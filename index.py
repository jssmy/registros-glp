import warnings
import pandas as pd
from datetime import datetime, timedelta


warnings.simplefilter("ignore")

cols = ['ACTIVIDAD', 'REGISTRO DE HIDROCARBUROS', 'RUC', 'RAZÓN SOCIAL','DEPARTAMENTO', 'PROVINCIA', 'DISTRITO', 'DIRECCIÓN', 'FECHA DE REGISTRO', 'PRODUCTO', 'PRECIO DE VENTA (SOLES)', 'UNIDAD']
yestarday = yesterday =  datetime.today() - timedelta(days=2)

all_sheets  = pd.read_excel('extracted/CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx',usecols=cols, engine="openpyxl")
#filter_sheet = all_sheets[pd.to_datetime(all_sheets['FECHA DE REGISTRO'], format='%d%m%y') == yestarday.__format__('%d%m%y')] 
print(all_sheets['FECHA DE REGISTRO'].__str__())
#print(datetime.strptime(all_sheets['FECHA DE REGISTRO'].__str__(), '%Y-%m-%d %H:%M:%S').__format__('%d%m%y'))
#pd.to_datetime(covid_cases[‘Date’], format=’%Y %m %d’)
#filter_sheet = all_sheets[pd.to_datetime(all_sheets['FECHA DE REGISTRO'], format='%d%m%y') == yestarday.date ] 
#values = filter_sheet.values
#filter_sheet.to_csv('extracted/CL-Registro-precios-DMA-V-CCA-CCE-2023_0.csv')


#total = 1000000
#chunksize = 5

#for skip in range(0, total, chunksize):
#    all_sheets  = pd.read_excel('extracted/CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx',usecols=cols, engine="openpyxl", skiprows=skip, nrows=chunksize)
#    row = all_sheets.values;
#    for col in row[0]:
#        print(col)
        
    
        
    