<?php
namespace Controllers\Api;
use Controllers\Api\BaseController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class SpaceXRocketController extends BaseController
{
    private $requestMethod;
    private $rocketId;
    private $strErrorDesc;
    private $key;

     public function __construct($rocketId = null)
    {
        $this->strErrorDesc = '';
        $this->requestMethod = $_SERVER["REQUEST_METHOD"];
        $this->rocketId = $rocketId;
        $this->url = API_URL;
        $this->key = "spacex_rocket_data";
    }
    /**
     * "/user/list" Endpoint - Get list of users
     */
    public function getAllRockets()
    {
        $requestMethod = $this->requestMethod;
        $strErrorDesc = $this->strErrorDesc;
        $response = array('status' => 200, 'message' => "Data fetch successfully");

        if (strtoupper($requestMethod) == 'POST') {
            try
            {
                $data = json_decode(file_get_contents("php://input"));

                $perPage = isset($data->perPage)? $data->perPage: 6;
                $offset = isset($data->offset)? $data->offset: 0;
                $status = isset($data->status)? $data->status: "";
                $type = isset($data->type)? ucfirst($data->type): "";
                $landings = isset($data->landings)? $data->landings: "";

                $url = $this->url . "/capsules?limit=$perPage&offset=$offset&status=$status&type=$type&landings=$landings";
                // Initializes a new cURL session
                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, $url);
                // Set the request data as JSON using json_encode function
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                // curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
                // Execute cURL request with all previous settings
                $curl_response = curl_exec($curl);
                $response = json_decode($curl_response, true);;
                // Close cURL session
                curl_close($curl);
            }

            catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        }
        else
        {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $response,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK'),
                "Data fetched successfully"
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader),
                $strErrorDesc
            );
        }

    }//end getRockets function

    public function getRocket($id)
    {
        // echo $id;die;
        $requestMethod = $this->requestMethod;
        $strErrorDesc = $this->strErrorDesc;
        $response = array('status' => 200, 'message' => "Data fetch successfully");

        if (strtoupper($requestMethod) == 'POST') {
            try
            {

                $url = $this->url . "/capsules/$id";
                // Initializes a new cURL session
                $curl = curl_init();
                curl_setopt($curl, CURLOPT_URL, $url);
                // Set the request data as JSON using json_encode function
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                // curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
                // Execute cURL request with all previous settings
                $curl_response = curl_exec($curl);
                $response = json_decode($curl_response, true);;
                // Close cURL session
                curl_close($curl);
            }

            catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        }
        else
        {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output
        if (!$strErrorDesc) {
            $this->sendOutput(
                $response,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK'),
                "Data fetched successfully"
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader),
                $strErrorDesc
            );
        }
    }

    public function processRequest($jwt = "")
    {
        // check authorization token
        $jwtTokenVerify = $this->checkJwtToken($jwt);

        if($jwtTokenVerify)
        {

            switch ($this->requestMethod) {
                case 'POST':
                    if ($this->rocketId) {
                        $response = $this->getRocket($this->rocketId);
                    } else {
                        $response = $this->getAllRockets();
                    };
                    break;
            }
        }
        
    }
    public function checkJwtToken()
    {
        try
        {
            $data = json_decode(file_get_contents("php://input"));

            $jwtToken = isset($data->jwtToken)? $data->jwtToken: "";

            if(!$jwtToken)
            {
               $this->sendOutput(
                    [],
                    array('Content-Type: application/json', 'http/1.1 401 unauthorized'),
                    // "401 unauthorized" 
                    $data
                ); 
            }

            $decoded = JWT::decode($jwtToken, new Key($this->key, 'HS256'));

            return true;
            
        }
        catch (Exception $e){
         
            $this->sendOutput(
                    [],
                    array('Content-Type: application/json', 'http/1.1 401 unauthorized'),
                    $e->getMessage() 
                );
            exit();
        }
    }
}