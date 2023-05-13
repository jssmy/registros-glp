folder="$HOME/app-process-file/extracted"

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
#curl -o $file  https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip
#echo "Downloaded file $file"
/usr/bin/php curl.php
unzip  -o $file -d $folder
rm -f "$folder/file.txt"
rm -f $file
echo ""
echo "*****     EXTRACION DE ARCHIVO   *****";

unzip -p "$folder/$excelName"  xl/worksheets/sheet1.xml > "$folder/file.txt"

echo ""
echo "*****     EXTRACIÓN DE DATOS   *****";
#node app.js



