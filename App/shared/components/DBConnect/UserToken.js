import { View, Text } from 'react-native'
import React from 'react'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const user = JSON.parse(await AsyncStorage.getItem("@storage_Key"));
    console.log('user from async storage', user);
    return user;
  } catch (error) {
    console.error("Failed to get user", error);
    return null;
  }
};

export const getUserToken = async () => {
  const user = await getUser();
  return user ? user.token : null;
};

export const fetchDataWithToken = async (url, method = 'GET', data = null) => {
  const token = await getUserToken();
  if (!token) {
    throw new Error('No user token found');
  }

  const config = {
    method: method,
    url: url,
    headers: { 'Authorization': `Bearer ${token}` },
    data: data
  };

  try {
    const response = await axios(config);
    console.log('data from localStorage', response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data with token", error);
    return null;
  }
};


/*  Call this fonction in all the pages that need to send data to the backend
import { fetchDataWithToken } from './UserToken';

// ...

const data = await fetchDataWithToken('http://localhost:5555/api/users/', 'POST', { key: 'value' });
*/