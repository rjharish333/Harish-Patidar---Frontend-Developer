import React, { useState, useEffect } from 'react';
import { Button  } from "@material-tailwind/react";
import SearchForm from '../common/SearchForm';
import { Alert } from '../services/NotiflixService';
import RocketCard from './../common/RocketCard';
import SpacexService from './../services/SpacexService';
import { useSelector, useDispatch } from 'react-redux';
import { getJwtToken } from '../redux/slices/authSlice';
import { getSpacexRockets, setLoadingStatus, setSpacexRockets } from '../redux/slices/rocketSlice';
import { getLoadingStatus } from './../redux/slices/rocketSlice';
import Loader from '../common/Loader';
import RocketModal from './../modals/RocketModal';

// Main dashboard UI for loggedin user
function HomeContainer() {

  const [type, setType] = useState("");
  const [status, setStatus] = useState("active");
  const [landings, setLandings] = useState(null);

  const [btnText, setBtnText] = useState("Load More")
  const [perPage, setPerPage] = useState(3)
  const [offset, setOffset] = useState(0)
  const [btnLoading, setBtnLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [apiCall, setApiCall] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [rocketId, setRocketId] = useState(null);
  const [rocketDetails, setRocketDetails] = useState(null);

  const jwtToken = useSelector(getJwtToken);

  const dispatch  = useDispatch();
  const rockets = useSelector(getSpacexRockets)
  const loading = useSelector(getLoadingStatus)

  useEffect(()=>{
      const getRockets = async() => {

        try
        {
          dispatch(setLoadingStatus(true));
          setBtnText("loading...")

          const _data = {perPage, offset, status, jwtToken, type, landings}
          let _resp = await SpacexService.getRockets(_data);

          if(offset > 0)
          {
            dispatch(setSpacexRockets([...rockets, ..._resp.data])) 
          }
          else{
            dispatch(setSpacexRockets(_resp.data))
          }

          _resp.data.length < 3 && setShowLoadMore(false);
          
        }
        catch(err)
        {
          Alert.error(err.message)
        }
        finally{
          setBtnText("Load More")
          dispatch(setLoadingStatus(false));
          setBtnLoading(false);
          setApiCall(false)
        }
      }

      apiCall && getRockets();

  }, [apiCall])

  useEffect(()=>{
    const getRocketDetails = async() => {

      try
      {
        dispatch(setLoadingStatus(true));

        let _resp = await SpacexService.getRocketDetails(rocketId, jwtToken);

        if(_resp.status === 'failure')
        {
          Alert.error(_resp.message)
          return
        }

        setRocketDetails(_resp.data);
        
      }
      catch(err)
      {
        Alert.error(err.message)
      }
      finally{
        dispatch(setLoadingStatus(false));
      }
    }

    showModal && getRocketDetails();

}, [showModal])

  const handleLoadMore = () => {
    setOffset(perPage + offset);
    setBtnLoading(true)
    setApiCall(true)
  }

  const handleReset = () => {
    setOffset(0)
    setApiCall(true)
  }

  const handleView = (_id) => {
    setRocketId(_id)
    setShowModal(true)
  }

  const handleClose = (_id) => {
    setRocketDetails(null)
    setShowModal(false)
  }
  

  return (
    <>
    { showModal &&
    <RocketModal rocketDetails={rocketDetails} showModal={showModal} handleClose={handleClose} />
    }
    <div className="px-16 py-16 lg:px-18">
        <SearchForm 
          handleReset={handleReset}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
          landings={landings}
          setLandings={setLandings}
        />
    </div>
    { loading && !btnLoading ? <Loader />
     :
    <div className="px-16 py-16 lg:px-18">
      <div class="grid grid-cols-3 gap-4">
          {
            rockets?.length > 0 ? rockets.map((rocket, index) => 
            <RocketCard rocket={rocket} handleView={handleView} key={index} />
            )
            :
            <h4>No Rockets Found</h4>
          }
      </div>

      {
        rockets?.length > 0 && 
        <div class="flex justify-center items-center w-100">
          {
          showLoadMore &&
            <Button size='md' style={{cursor:'pointer'}} onClick={handleLoadMore} variant="standard">
              { loading && btnLoading ? <Loader /> : "Load More" }
            </Button>
          }
        </div>
      }
      
    </div>
    }
    </>
  )
}

export default HomeContainer