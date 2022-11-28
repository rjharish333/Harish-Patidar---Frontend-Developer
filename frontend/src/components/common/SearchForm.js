import { Select, Option, Input, Button, Typography  } from "@material-tailwind/react";
import { useState } from "react";
import { setLoadingStatus, setSpacexRockets } from "../redux/slices/rocketSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getJwtToken } from './../redux/slices/authSlice';
import SpacexService from './../services/SpacexService';
import { Alert } from "../services/NotiflixService";

// Common component to display search form
const SearchForm = ({type, setType, status, setStatus, landings, setLandings, handleReset}) => {

  const dispatch = useDispatch();
  const jwtToken = useSelector(getJwtToken);

  const handleResetForm = async() => {
    setStatus("")
    setType("")
    setLandings("")
    handleReset();
    
  }

  // Handler search when user click on search btn 
  const handleSearch = async() => {

    try
    {
      dispatch(setLoadingStatus(true));
      const _data = {perPage: 3, offset: 0, landings, type, status, jwtToken}
      let _resp = await SpacexService.getRockets(_data);

      if(_resp.status === 'failure')
      {
        Alert.error(_resp.message);
        return
      }
      dispatch(setSpacexRockets(_resp.data))
    }
    catch(err)
    {
      Alert.error(err.message)
    }
    finally{
      dispatch(setLoadingStatus(false));
    }

  }

  return (
    <>
    <div className="flex w-full pb-10 items-end gap-4" id="search_container">
        <Typography variant="h2">Spacex Rockets</Typography>
    </div>
    <div className="flex w-full items-end gap-4">
      <Input variant="standard" value={type} onChange={(e) =>setType(e.target.value)} label="Search By Rocket Type" />
      <Select onChange={(value) => setStatus(value)} value={status} variant="standard" label="Rocket Status">
        <Option value=""></Option>
        <Option value="active">Active</Option>
        <Option value="destroyed">Destroyed</Option>
        <Option value="retired">Retired</Option>
        <Option value="unknown">Unknown</Option>
      </Select>
      <Select onChange={(value) => setLandings(value)} value={landings} variant="standard" label="Number of landings">
        <Option value=""></Option>
        <Option value="0">0</Option>
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
        <Option value="5">5</Option>
        <Option value="6">6</Option>
        <Option value="7">7</Option>
        <Option value="8">8</Option>
        <Option value="9">9</Option>
        <Option value="10">10</Option>
      </Select>
      <Button style={{cursor:'pointer', width: "200px"}} onClick={handleSearch} variant="outlined">Search</Button>
      <Button style={{cursor:'pointer', width: "200px"}} onClick={handleResetForm} variant="outlined">Reset</Button>
    </div>
    </>
  )
}

export default SearchForm