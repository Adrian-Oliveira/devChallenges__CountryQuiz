import { useEffect, useState } from 'react';

import './homePage.scss';


import { useAppDispatch, useAppSelector } from '../../core/hooks';

import { fetchCountriesData, generateRandomQuestion, guessAnswer, newGame } from '../../redux/countries/countriesSlice';

const Home = ()=> {

    const dispatch = useAppDispatch();
    const options = useAppSelector((store)=>store.countries.options);
    const questionType = useAppSelector((store)=>store.countries.questionType);
    const rightAnswer = useAppSelector((store)=>store.countries.currentCountry);
    const currentCountry = useAppSelector((store)=>store.countries.currentCountry);
    const currentScore = useAppSelector((store)=>store.countries.currentScore);
    const guessed = useAppSelector((store)=>store.countries.guessed);
    const gaveWrongAnswer = useAppSelector((store)=>store.countries.gaveWrongAnswer);

    const [gameEnded, setGameEnded] = useState(false);
    
    useEffect(()=>{
        dispatch(fetchCountriesData());

    },[])
   

    return(
        <div className='homePage'>

            {gameEnded?
                <>
                    <h1>Result</h1>
                    <p>You got {currentScore} correct answers</p>
                    <button onClick={()=>{dispatch(newGame()); setGameEnded(false)}}>Try again</button>
                </>
                :
                <>
                    {questionType==='capital'?
                    <h1>{currentCountry.capital[0]} is the capital of</h1>
                        :
                        <h1>{currentCountry.flag} Which country does this flag belong to?  </h1>
                    }
                    <h1>rightAnswer : {rightAnswer.name.common}</h1>
                    <h1>Options</h1>
                    {options.map((c, index)=>{

                        return(
                            <button key={index} onClick={()=>dispatch(guessAnswer(c))}>
                                {c?.name?.common}
                            </button>
                        );
                    })}

                    {guessed?
                        <button onClick={()=>{
                            gaveWrongAnswer?setGameEnded(true):dispatch(generateRandomQuestion())}}>
                            Next
                        </button>
                        :null}
                </>
            
            }
        </div>
    );
}


export {Home}