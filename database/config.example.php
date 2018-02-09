<?php

/**
 * Configuration for database connection
 *
 */

$host       = "127.0.0.1";
$username   = "";
$password   = "";
$dbname     = "reimg";
$dsn        = "mysql:host=$host;dbname=$dbname";
$options    = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
);