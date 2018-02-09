<?php

/**
 * Open a connection via PDO to create a
 * new database and table with structure.
 *
 */

require('./database/config.php');

try
{
    $connection = new PDO("mysql:host=$host", $username, $password, $options);
    $sql = file_get_contents("./database/migrations/migrations.sql");
    $connection->exec($sql);
    echo "Database migrations ran successfully.";
}

catch(PDOException $error) {
    echo $error->getMessage();
}