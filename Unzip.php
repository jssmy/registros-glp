<?php
class UnZip {
    private $zipFile = '';
    private $extractPath = '';
    function __construct($zipFile,$extractDir) {
        $this->extractPath = $extractDir;
        $this->zipFile = $zipFile;
    }

    public function do() {
        $zip = new ZipArchive;
        if($zip->open($this->zipFile) != "true"){
            return "Error :- Unable to open the Zip File";
        } 

        /* Extract Zip File */

        $filenameXSL = $zip->getNameIndex($zip->numFiles - 1);
        $zip->extractTo($this->extractPath);
        $zip->close();
        return $this->extractPath.'/'.$filenameXSL;
    }
}
