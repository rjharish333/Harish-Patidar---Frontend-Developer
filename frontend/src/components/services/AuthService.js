import responseService from './ResponseService';
import axiosService from './AxiosService';

//Function - login data based on the static value 

const login = async (_data) => {
    try {
        const response = await axiosService.post(
            `${process.env.REACT_APP_API_ENDPOINT}/login`,
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

const AuthService = {
    login
};

export default AuthService;