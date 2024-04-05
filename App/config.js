import { Platform } from 'react-native';

export const API_URL = Platform.OS === 'android' ? 'http://192.168.1.100::5555' : 'http://localhost:5555';