import React from 'react';
import { Moon, Sun } from './Helpers';
import '../styles/mode.scss';

const ToggleMode = () => {
    const [isChecked, setIsChecked] = React.useState(false);

    const setDarkMode = () => {
        document.querySelector('body')?.setAttribute('theme', 'dark');
        window.localStorage.setItem('mode', 'dark')
    }
    
    const setLightMode = () => {
        document.querySelector('body')?.setAttribute('theme', 'light');
        window.localStorage.setItem('mode', 'light')
    }

    React.useEffect(() => {
        if (window.localStorage.getItem('mode') === 'dark') {
            setIsChecked(true);
            setDarkMode();
        } else if (window.localStorage.getItem('mode') === 'light') {
            setIsChecked(false);
            setLightMode();
        }
    }, []);
    
    const toggleMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);

        if (e.target.checked) {
            setDarkMode();
        } else {
            setLightMode();
        }
    }

    return (
        <div className={'mode'}>
            <div className='dark_mode'>
                <input
                    type="checkbox"
                    className='dark_mode_input'
                    onChange={toggleMode}
                    id='darkmode-toggle'
                    checked={isChecked}
                />
                <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                    <Sun />
                    <Moon />
                </label>
            </div>
        </div>
    )
}

export default ToggleMode