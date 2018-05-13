<?php

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $url = $_POST['url'];
    $type = $_POST['type'];
    $name = $_POST['name'];
    $images_directory = $_POST['storage_uri'];

    $original_name = basename($url);
    $ext = substr($original_name, strrpos($original_name, '.'));

    $img = file_get_contents($url);
    $path = getSafePath($images_directory, $type, $name, $ext, 0);

    initStorage([
        $images_directory,
        $images_directory.'/NSFW',
        $images_directory.'/SAFE'
    ]);

    if($img) {
        file_put_contents($path, $img);
        echo json_encode(true);
    }
    else {
        echo json_encode(false);
    }
}
function initStorage($directories){
    foreach($directories as $directory){
        if (!file_exists($directory)) {
            mkdir($directory);
        }
    }
}

function getSafePath($dir, $type, $name, $ext, $counter){
    $safe_path = $dir.'/'.$type.'/'.$name.$counter.$ext;
    if(file_exists($safe_path)){
        return getSafePath($dir, $type, $name, $ext, ++$counter);
    }else{
        return $safe_path;
    }
}