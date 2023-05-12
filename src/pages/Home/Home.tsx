import { useEffect, useState } from 'react';

import './homePage.scss';


import icon from '../../assets/undraw_adventure_4hum 1.svg'

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
            {/* <img src={background} alt="" /> */}
            <h1 className='homePage__title'>Country quiz </h1>

            <section className='homePage__cardGame'>
                <img src={icon} className='homePage__cardGame__image' />
                {gameEnded?
                    <>
                        <h1>Result</h1>
                        <p>You got {currentScore} correct answers</p>
                        <button onClick={()=>{dispatch(newGame()); setGameEnded(false)}}>Try again</button>
                    </>
                    :
                    <>
                        {questionType==='capital'?
                            <h1 className='homePage__cardGame__question'>
                                {currentCountry.capital[0]} is the capital of
                            </h1>
                            :
                            <>
                                <h1 className='homePage__cardGame__flag'>{currentCountry.flag}</h1>
                                <h1 className='homePage__cardGame__question'>
                                    Which country does this flag belong to?  
                                </h1>
                            </>
                        }
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
        </section>
        </div>
    );
}


export {Home}