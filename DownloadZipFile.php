<?php
class DownLoadZipFile {
    public function get($url, $downloadTo) {
        $zipFile = "$downloadTo/".basename($url); // Rename .zip file        
        $zipResource = fopen("$zipFile", "w");
    
        // Get The Zip File From Server
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER,true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0); 
        curl_setopt($ch, CURLOPT_FILE, $zipResource);
    
        $page = curl_exec($ch);
    
        if(!$page) {
            echo "Error :- ".curl_error($ch);
        }
    
        curl_close($ch);
        return "$zipFile";
    }
}