<?php

/**
 * Open a connection via PDO to create a
 * new database and table with structure.
 *
 */

require('config.php');

try
{
    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, $options);
}
catch(PDOException $error) {
    echo $error->getMessage();
}