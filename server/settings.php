<?php

if($_SERVER['REQUEST_METHOD'] === 'GET') {
    $dir = $_GET['storage_dir'];
    $errors = [];
    if(is_dir($dir)){
        if(is_writeable($dir) && is_readable($dir)){
            die(json_encode([
                'errors' => $errors
            ]));
        }else{
            $errors[] = 'Directory does not have sufficient read or write permissions';
        }
    }else{
        $errors[] = 'Invalid directory or doesn\'t exist';
    }
    die(json_encode([
        'errors' => $errors
    ]));
}