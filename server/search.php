<?php
require_once '../vendor/autoload.php';

try{
    $params = isset($_GET['req_params']) && $_GET['req_params'] != '' ? $_GET['req_params'] : '';
    $reddit = isset($_GET['reddit']) && $_GET['reddit'] != '' ? $_GET['reddit'] : '';
    $url = 'https://www.reddit.com/r/'. $reddit . '.json'. $params;

    try{
        $client = new GuzzleHttp\Client(['base_uri' => $url]);
        $response = $client->request('GET', '');

        echo $response->getBody()->getContents();
    }catch(Exception $exception){
        http_response_code(404);
    }

}catch(Exception $exception){
    echo $exception->getMessage();
}
