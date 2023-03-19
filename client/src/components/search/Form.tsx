import React from 'react'
import { useAppDispatch } from "../../redux/store";

import { setQuery } from '../../redux/slices/searchSlice';
import { SearchPageIcon, CrossIcon } from '../Helpers';
import { IData } from '../../types';
import { Link } from 'react-router-dom';

interface IProps {
    onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
    localQuery: string;
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isPopupVisible: boolean;
    sliced: {
        loading: boolean;
        data: {
            getSliced: IData[];
        }
    };
    setLocalQuery: React.Dispatch<React.SetStateAction<string>>;
    setIsPopupVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<IProps> = ({ onSubmitForm, localQuery, setLocalQuery, onChangeInput, isPopupVisible, setIsPopupVisible, sliced }) => {
    const dispatch = useAppDispatch();

    const formRef = React.useRef(null);

    React.useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
        function handleClick(e: any) {
            if (formRef && formRef.current) {
                const ref: any = formRef.current
                if (!ref.contains(e.target)) {
                    setIsPopupVisible(false);
                }
            }
        }
    }, [isPopupVisible]);

    const clearInput = () => {
        if (localQuery) {
            setLocalQuery('');
            setIsPopupVisible(false);
        }
    }

    return (
        <form onSubmit={onSubmitForm} className={'search__main-form'} ref={formRef}>
            <button
                type="submit"
                className={'search__main-form-btn search__main-form-btn-search'}
            >
                <SearchPageIcon color={'#fff'} />
            </button>

            <div className={'search__main-form-input-wrapper'}>
                <input
                    value={localQuery}
                    onChange={(event) => onChangeInput(event)}
                    className={'search__main-form-input'}
                    placeholder='Type here'
                />
                <ul className={'search__main-form-ul'}>
                    {isPopupVisible && (sliced.loading ? <>Loading...</> : (
                        sliced.data?.getSliced.map((el: IData) => (
                            <li className={'search__main-form-ul-li'} key={el.id} >
                                <div>
                                    <span className='search__main-form-ul-li-date'>
                                        {el.first_air_date?.slice(0, 4) || el.release_date?.slice(0, 4) || '????'}
                                    </span>
                                    <Link to={`/${el.first_air_date ? 'tv' : 'movie'}/${el.id}`}>
                                        <span className='search__main-form-ul-li-text'>
                                            {el.title || el.name}
                                        </span>
                                    </Link>
                                </div>
                            </li>
                        ))
                    ))}

                    {isPopupVisible && !sliced.loading ?
                        <li className={'search__main-form-ul-li'}>Load more data... (414)</li> : null}
                </ul>
            </div>

            <button
                className={'search__main-form-btn search__main-form-btn-clear'}
                onClick={() => clearInput()}
            >
                <CrossIcon color={'#fff'} />
            </button>
        </form>
    )
}

export default Form