folder="extracted"
if [! -d "$HOME/$folder" ]
then
  echo "Folder no existe $HOME/$folder"
  mkdir "extracted"
else
  echo "Folder si existe $HOME/$folder"
fi

curl -o extracted/file.zip https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip