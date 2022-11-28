<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
define("API_URL", "https://api.spacexdata.com/v3");

require __DIR__ . '/../lib/vendor/autoload.php';
 
// include the base controller file
require_once PROJECT_ROOT_PATH . "/Controllers/Api/BaseController.php";
require_once PROJECT_ROOT_PATH . "/Controllers/Api/SpaceXRocketController.php";
require_once PROJECT_ROOT_PATH . "/Controllers/Api/AuthController.php";
