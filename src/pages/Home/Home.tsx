import { useEffect, useState } from 'react';

import './homePage.scss';


import icon from '../../assets/undraw_adventure_4hum 1.svg';
import endGameIcon from '../../assets/undraw_winners_ao2o 2.svg';

import { useAppDispatch, useAppSelector } from '../../core/hooks';

import { fetchCountriesData, generateRandomQuestion, guessAnswer, newGame } from '../../redux/countries/countriesSlice';
import { current } from '@reduxjs/toolkit';

const Home = ()=> {

    const dispatch = useAppDispatch();
    const options = useAppSelector((store)=>store.countries.options);
    const questionType = useAppSelector((store)=>store.countries.questionType);
    const rightAnswer = useAppSelector((store)=>store.countries.currentCountry);
    const currentCountry = useAppSelector((store)=>store.countries.currentCountry);
    const currentScore = useAppSelector((store)=>store.countries.currentScore);
    const currentGuess = useAppSelector((store)=>store.countries.currentGuess);
    const guessed = useAppSelector((store)=>store.countries.guessed);
    const gaveWrongAnswer = useAppSelector((store)=>store.countries.gaveWrongAnswer);

    const [gameEnded, setGameEnded] = useState(false);
    const alternatives = ["A", "B", "C","D"]
    
    useEffect(()=>{
        dispatch(fetchCountriesData());

    },[])
   

    return(

        <div className='homePage'>
            <h1 className='homePage__title'>Country quiz </h1>
                {gameEnded?
                <div className='homePage__endgame'>
                    <img className='homePage__endgame__img' src={endGameIcon} alt="" />
                    <div className='homePage__endgame__msg' >
                        <h1>Result</h1>
                        <p>
                            You got <span className='homePage__endgame__score'>{currentScore}</span> correct answers
                        </p>
                    </div>  
                    <button className='homePage__endgame__btn' 
                    onClick={()=>{dispatch(newGame()); setGameEnded(false)}}>Try again</button>
                </div>
                :
                <div className='homePage__cardGame'>
                    <img src={icon} className='homePage__cardGame__image' />
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

                        const modifyButton = guessed && (c.name.common === rightAnswer.name.common)?
                                                'rightAnswer':
                                             gaveWrongAnswer && (c.name.common === currentGuess)?
                                                'wrongAnswer':null;
                            
                        return(
                            <button 
                            className={`homePage__cardGame__button 
                                        ${modifyButton && `homePage__cardGame__button--${modifyButton}`}`} 
                            key={index} onClick={()=>!guessed?dispatch(guessAnswer(c)):null}>
                                <i>{alternatives[index]}</i> <span>{c.name.common}</span>

                                {   
                                    modifyButton === 'wrongAnswer'?
                                        <i className="material-symbols-outlined homePage__cardGame__button__icon">
                                            cancel
                                        </i>
                                    :
                                    modifyButton === 'rightAnswer'?
                                        <i className="material-symbols-outlined homePage__cardGame__button__icon">
                                            task_alt
                                        </i>
                                    :
                                    null
                                }
                            </button>
                        );
                    })}

                    {guessed?
                        <button 
                            className='homePage__cardGame__nextButton'
                            onClick={()=>{
                            gaveWrongAnswer?setGameEnded(true):dispatch(generateRandomQuestion())}}>
                            Next
                        </button>
                        :null}
                </div>
            
            }
        </div>
    );
}


export {Home}