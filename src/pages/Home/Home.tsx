import { useEffect } from 'react';

import './homePage.scss';


import { useAppDispatch, useAppSelector } from '../../core/hooks';

import { fetchCountriesData } from '../../redux/countries/countriesSlice';

const Home = ()=> {

    const dispatch = useAppDispatch();
    const countriesData = useAppSelector((store)=>store.countries.countriesData)

    
    useEffect(()=>{
        dispatch(fetchCountriesData());
    },[])
   
    return(
        <div className='homePage'>

            {countriesData.map((c)=>{

                return(
                    <div>
                        {c?.name?.common}
                    </div>
                );
            })}
        </div>
    );
}


export {Home}