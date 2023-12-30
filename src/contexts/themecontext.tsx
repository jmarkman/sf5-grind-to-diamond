import { createContext } from 'react';
import { ThemeContextType } from '../models/ThemeContextType';

export const ThemeContext = createContext<null | ThemeContextType>(null);



