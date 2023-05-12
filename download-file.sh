#folder="$HOME/cron/registros-glp/extracted"
folder="C:/laragon/www/unzip/extracted"
excelName="CL-Registro-precios-DMA-V-CCA-CCE-2023_0.xlsx"
file="$folder/file.zip"

echo "***********************************";
echo "*****     INICIANDO PROCESO   *****";
echo "***********************************";

echo ""
echo "Validar folder..."
if [ ! -d  $folder ]
then
  echo "Folder no existe $folder"
  echo "Creaando folder $folder"
  mkdir $folder
else
  echo "Folder si existe $folder"
fi

echo "Limpiando folder..."
rm  -rfv "$folder/"*

echo ""
echo "*****     DESCARGANDO ARCHIVO   *****";
echo ""
curl -o $file  https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip
echo "Downloaded file $file"
unzip  -o $file -d $folder
rm -f "$folder/file.txt"
rm -f $file
echo ""
echo "*****     EXTRACION DE ARCHIVO   *****";
#unzip "$folder/$excelName" -d $folder
#unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml | sed -e 's/<[^>]\{1,\}>//g;s/[^[:print:]] \{1,\}/|/g' > "$folder/file.txt"
#unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml | sed -e 's/.*<row r="\([0-9]\+\)".*/\1,/p; s/<\/\?[^>]\+>//g; s/^,//p' > archivo.csv

unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml > "$folder/file.txt"
#unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml > "$folder/file.txt"


##unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml | sed -e 's/.*<t>\([^<]*\)<\/t>.*/\1/g' > "$folder/file.txt"
node process-file.js



