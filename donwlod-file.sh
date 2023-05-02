folder="$HOME/cron/registros-glp"

if [! -d  "$folder"]
then
  echo "Folder no existe $folder"
  mkdir $folder
else
  echo "Folder si existe $folder"
fi

curl -o extracted/file.zip https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip