import { useEffect } from 'react';

import './homePage.scss';


import { useAppDispatch, useAppSelector } from '../../core/hooks';

import { fetchCountriesData, generateRandomQuestion } from '../../redux/countries/countriesSlice';

const Home = ()=> {

    const dispatch = useAppDispatch();
    const countriesData = useAppSelector((store)=>store.countries.countriesData);
    const options = useAppSelector((store)=>store.countries.options);
    const questionType = useAppSelector((store)=>store.countries.questionType);
    const rightAnswer = useAppSelector((store)=>store.countries.currentCountry);

    
    useEffect(()=>{
        dispatch(fetchCountriesData());
    },[])
   
    return(
        <div className='homePage'>

            <h1>questionType: {questionType}</h1>
            <h1>rightAnswer : {rightAnswer.name.common}</h1>
            <h1>Options</h1>
            {options.map((c, index)=>{

                return(
                    <div key={index}>
                        {c?.name?.common}
                    </div>
                );
            })}
        </div>
    );
}


export {Home}