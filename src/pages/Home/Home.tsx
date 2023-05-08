import { useEffect } from 'react';

import './homePage.scss';


import { useAppDispatch, useAppSelector } from '../../core/hooks';

import { fetchCountriesData, generateRandomQuestion, guessAnswer } from '../../redux/countries/countriesSlice';

const Home = ()=> {

    const dispatch = useAppDispatch();
    const options = useAppSelector((store)=>store.countries.options);
    const questionType = useAppSelector((store)=>store.countries.questionType);
    const rightAnswer = useAppSelector((store)=>store.countries.currentCountry);
    const currentCountry = useAppSelector((store)=>store.countries.currentCountry);
    const currentScore = useAppSelector((store)=>store.countries.currentScore);
    const guessed = useAppSelector((store)=>store.countries.guessed);


    
    useEffect(()=>{
        dispatch(fetchCountriesData());
    },[])
   
    return(
        <div className='homePage'>
            {questionType==='capital'?
                <h1>{currentCountry.capital[0]} is the capital of</h1>
                :
                <h1>{currentCountry.flag} Which country does this flag belong to?  </h1>
            }
            <h1>questionType: {questionType}</h1>
            <h1>rightAnswer : {rightAnswer.name.common}</h1>
            <h1>Current Score : {currentScore}</h1>
            <h1>Options</h1>
            {options.map((c, index)=>{

                return(
                    <button key={index} onClick={()=>dispatch(guessAnswer(c))}>
                        {c?.name?.common}
                    </button>
                );
            })}

            {guessed?<button onClick={()=>dispatch(generateRandomQuestion())}>Next</button>:null}
            
        </div>
    );
}


export {Home}