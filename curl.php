<?php

$url  = 'https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip';
$fileName = "file.zip";
$path = "extracted/$fileName";

$fp = fopen($path, 'w');

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_FILE, $fp);

$data = curl_exec($ch);

curl_close($ch);
fclose($fp);