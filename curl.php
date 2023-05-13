<?php
class DownLoadZipFile {
    public function get($url, $downloadTo) {
        $zipFile = "$downloadTo/".basename($url); // Rename .zip file        
        $zipResource = fopen("$zipFile", "w");

        // Get The Zip File From Server
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_FILE, $zipResource);
        /*
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        */
        $page = curl_exec($ch);

        if(!$page) {
            echo "Error :- ".curl_error($ch);
        }

        curl_close($ch);
        fclose($zipResource);
        return "$zipFile";
    }
};


$donloadTo = __DIR__."/file.zip";
//$zipFile = (new DownLoadZipFile())->get("https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip", $donloadTo);


$url="https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip";//remote url to download
$upload_path="$donloadTo";//PHP Your local file upload_path
$con=file_get_contents($url);
file_put_contents($upload_path, $con);
