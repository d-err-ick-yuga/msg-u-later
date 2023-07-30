<?php

$config = require_once './includes/config.php';

$host = $config['host'];
$user = $config['username'];
$password = $config['password'];
$dbname = $config['dbname'];
$chrs = 'utf8mb4';

$dsn = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=' . $chrs;

try {
    $pdo = new PDO($dsn, $user, $password);
}
catch(PDOExeption $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}