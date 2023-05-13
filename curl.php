<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$url  = 'https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip';
$fileName = "file.zip";
$path = "/home/peruenergyadviso/app-process-file/extracted/$fileName";
echo "extracted in $path"
$fp = fopen($path, 'w');

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_FILE, $fp);

$data = curl_exec($ch);

curl_close($ch);
fclose($fp);

echo "-extraccion terminado-"