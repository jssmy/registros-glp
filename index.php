<?php 

try {
	require __DIR__.'/DownloadZipFile.php';
	require __DIR__.'/Unzip.php';
	$extractDir = "extracted";
	$donloadTo = __DIR__;
	$zipFile = (new DownLoadZipFile())->get("https://www.osinergmin.gob.pe/seccion/centro_documental/hidrocarburos/SCOP/SCOP-DOCS/2023/Registro-precios/CL-Registro-precios-DMA-V-CCA-CCE-2023.zip", $donloadTo);
    //$content = "";
    //$logFile = fopen("$donloadTo/log.txt", 'a') or die("Error creando archivo");

    ini_set("memory_limit", "256M");

    /* Open the Zip file */

	//$filenameXSL = (new UnZip($zipFile, "$donloadTo/$extractDir"))->do();
    //$content.="$zipFile | ";
    //$content .= "$zipFile |";
    //unlink($zipFile);
    //rename($filenameXSL, $donloadTo.'/'.$extractDir.'/file.xlsx');

    //fwrite($logFile,$content) or die("Error escribiendo en el archivo");
    //fclose($logFile);
    
} catch (Exception $e) {
    $logFile = fopen("$donloadTo/error.txt", 'a') or die("Error creando archivo");
    fwrite($logFile, $e->getMessage()) or die("Error escribiendo en el archivo");
    fclose($logFile);
}
