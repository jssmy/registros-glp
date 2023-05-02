folder="$HOME/cron/registros-glp/extracted"

if [ ! -d  $folder ]
then
  echo "Folder no existe $folder"
  mkdir $folder
else
  echo "Folder si existe $folder"
fi
file="$folder/file.zip"
curl -o $file  https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip
unzip -q $file -d $folder
rm -f $file