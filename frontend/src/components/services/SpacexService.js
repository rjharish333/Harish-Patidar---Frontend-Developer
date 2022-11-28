import responseService from './ResponseService';
import axiosService from './AxiosService';

// Function to get the list of all capsules from Spacex with pagination & filters

const getRockets = async (_data) => {
    try {
        const response = await axiosService.post(
            `${process.env.REACT_APP_API_ENDPOINT}/spacex/capsules`,
            _data
        );
        console.log("response", response)
        return response.data;

    } catch (error) {
        console.log("data", error)
       if(error.response.status === 500 ){
        return responseService.buildFailure(error.response.data.message)
       } 

       return responseService.buildFailure(error.message)
    }
}

// Function to get the the Metadata of single capsule (key = capsule unique serial number)
 
const getRocketDetails = async (_rocketId, jwtToken ) => {
    try {
        const response = await axiosService.post(
            `${process.env.REACT_APP_API_ENDPOINT}/spacex/capsules/${_rocketId}`,
            {jwtToken: jwtToken}
        );
        
        // Logging the data in console for debuging
        // console.log("response", response)
        return response.data;

    } catch (error) {

        // Logging the data in console for debuging
        // console.log("data", error)
       if(error.response.status === 500 ){
        return responseService.buildFailure(error.response.data.message)
       } 

       return responseService.buildFailure(error.message)
    }
}

const SpacexService = {
    getRockets,
    getRocketDetails
};


export default SpacexService;