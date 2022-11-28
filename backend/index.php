<?php
require "inc/bootstrap.php";
use Controllers\Api\SpaceXRocketController;
use Controllers\Api\AuthController;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// check for login api
if ($uri[3] === 'api' && $uri[4] === 'login' && $_SERVER["REQUEST_METHOD"] === 'POST') {
    $controller = new AuthController();
    $controller->login();
    exit();
}

// all of our endpoints start with /api/spacex
// everything else results in a 404 Not Found
if ($uri[3] !== 'api' && $uri[4] !== 'spacex') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

if (isset($uri[5]) && $uri[5] !== 'capsules' ) {
    header("HTTP/1.1 404 Not Found");
    exit();
}
// echo "dffs";die;
// get rocket id and its optional
$rocketId = null;
if (isset($uri[6])) {
    $rocketId = strtoupper($uri[6]);
}

// pass the request method and user ID to the PersonController and process the HTTP request:
$controller = new SpaceXRocketController($rocketId);
$controller->processRequest();