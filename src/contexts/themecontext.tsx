import React, { createContext, useState } from 'react';
import { ThemeContextType } from '../models/ThemeContextType';

export const ThemeContext = createContext<null | ThemeContextType>(null);



