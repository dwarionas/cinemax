import React from 'react';
import { Moon, Sun } from './Helpers';
import '../styles/mode.scss';
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";
import { setDarkTheme } from '../redux/slices/modeSlice';

const ToggleMode = () => {
    const dispatch = useAppDispatch();
    const isDarkMode = useSelector((state: RootState) => state.mode.darkMode);

    const setDarkMode = () => {
        document.querySelector('body')?.setAttribute('theme', 'dark')
        dispatch(setDarkTheme(true));
    }
    
    const setLightMode = () => {
        document.querySelector('body')?.setAttribute('theme', 'light')
        dispatch(setDarkTheme(false));
    }
    
    const toggleMode = (e: React.ChangeEvent<HTMLInputElement>) => {  
        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    React.useEffect(() => {
        if (isDarkMode) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, [isDarkMode]);

    return (
        <div className='dark_mode'>
            <input 
                type="checkbox" 
                className='dark_mode_input'
                onChange={toggleMode} 
                id='darkmode-toggle'
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    )
}

export default ToggleMode