import axios, { AxiosBasicCredentials, AxiosError, AxiosRequestConfig } from 'axios';
import NetworkResponse from './NetworkResponse';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_ENDPOINT = 'https://www.paw-5.com/';
interface Request {
  method: 'GET' | 'POST',
  host: string,
  options: AxiosRequestConfig,
  body?: {},
}

class Network {
  request?: Request;

  response?: NetworkResponse;

  public static instance: Network;


  get = async (host: string, options: AxiosRequestConfig) => {
    const loginToken = await AsyncStorage.getItem('@loginToken');
    this.request = {
      method: 'GET',
      host,
      options: {
        headers: {
          Authorization: loginToken ? `Bearer ${loginToken}` : undefined,
          ...options && options.headers,
        },
        ...options,
      },
    };
    try {
      const response = await axios.get(API_ENDPOINT + host, this.request.options);
      this.response = new NetworkResponse(response);
      return this.response;
    } catch(e) {
      if (e instanceof AxiosError && e.response) {
        this.response = new NetworkResponse(e.response);
        return this.response;
      }
      throw e;
    }
  };

  post = async (host: string, body: {}, options: AxiosRequestConfig) => {
    const loginToken = await AsyncStorage.getItem('@loginToken');
    this.request = {
      method: 'POST',
      host,
      options: {
        headers: {
          Authorization: loginToken ? `Bearer ${loginToken}` : undefined,
          ...options && options.headers,
        },
        ...options,
      },
      body
    };
    try {
      const response = await axios.post(API_ENDPOINT + host, body, this.request.options);
      this.response = new NetworkResponse(response);
    return this.response;
    } catch(e) {
      if (e instanceof AxiosError && e.response) {
        this.response = new NetworkResponse(e.response);
        return this.response;
      }
      throw e;
    }
  };

  static getInstance = () => {
    if (Network.instance) return Network.instance;
    Network.instance = new Network();
    return Network.instance;
  }
}

export default Network.getInstance;
