<?php
namespace Controllers\Api;
use Controllers\Api\BaseController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends BaseController
{
    private $email;
    private $password;
    private $token;

     public function __construct($rocketId = null)
    {
    	// define static email,password for login without using database
        $this->email = 'user@spacex.com';
        $this->password = '@123@123';
    }
    /**
     * "/user/list" Endpoint - Get list of users
     */
    public function login()
    {
        $email = $this->email;
        $password = $this->password;

        $data = json_decode(file_get_contents("php://input"));

        $userEmail = isset($data->email)? strtolower($data->email): "";
        $userPass = isset($data->password)? strtolower($data->password): "";
        // print_r($data);die;
        if ($email !== $userEmail) 
        {
        	$this->sendOutput([], 
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error'),
                "Email is incorrect"
            );
            exit();
        }
        else if($password !== $userPass)
        {
        	$this->sendOutput([],
                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error'),
                "Password is incorrect",
            );
            exit();
        }
        else
        {
        	try
        	{
        		// timezone
        		date_default_timezone_set('Asia/Manila');
 
				// variables used for jwt
				$key = "spacex_rocket_data";
				$issued_at = time();
				$expiration_time = $issued_at + (60 * 60); // valid for 1 hour
				$issuer = "http://localhost/spacex-api/";

				$token = array(
			       "iat" => $issued_at,
			       "exp" => $expiration_time,
			       "iss" => $issuer,
			       "data" => array(
			           "email" => $userEmail,
			           "password" => $userPass
			       )
			    );

				// generate jwt
    			$jwt = JWT::encode($token, $key, 'HS256');
    			$this->sendOutput(
    				['token' => $jwt],
	                array('Content-Type: application/json', 'HTTP/1.1 200 OK'),
	                'Login successfully'
	            );
        	}
        	catch (Error $e) 
        	{
        		$this->sendOutput([],
	                array('Content-Type: application/json', 'HTTP/1.1 500 Internal Server Error'),
	                $e->getMessage() 
	            );
            }
        }

    }//end login function

}