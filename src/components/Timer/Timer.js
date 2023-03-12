import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Timer.css';

const Timer = () => {
    const { register, formState: { errors}, handleSubmit } = useForm({ mode: 'onChange', });
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [run, setRun] = useState(false)

    useEffect(() => {
      if ( (seconds === 0) && (minutes === 0)&& (hours === 0)) setRun(false);
        if (run === true) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {

                    if (minutes === 0) {
                        if (hours === 0) { clearInterval(myInterval); }
                        else { setHours(hours - 1); setMinutes(59) }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }

    }, [seconds, run, minutes]);

    const onSubmit=()=> {
       run === true?  setRun(!run) : setRun(true)

    }

    function handleHourChange(e) {
        
        if (run === false) setHours(Number(e.target.value));
    }
    function handleMinuteChange(e) {
     
        if (run === false) setMinutes(Number(e.target.value));
    }
    function handleSecondChange(e) {
        if (run === false) setSeconds(Number(e.target.value));
    }

    return (<>
<div className='circle'>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <fieldset className="form__container">
                <div className="form__input-container">
                    <label className="form__input__title">Часы</label>
                    <input

                        className="form__input hover"
                        type="number"
                        value={hours}
                        {...register("hour", {
                            onChange: handleHourChange,

                        })}
                    >
                    </input>
                    <span className="form__error"> {errors?.hour && errors.hour.message}</span>
                </div>
                <div className="form__input-container">
                    <label className="form__input__title">Минуты</label>
                    <input
                        className="form__input hover"
                        type="number"
                        value={minutes}
                        {...register("minute", {

                            onChange: handleMinuteChange,

                        })}
                    >
                    </input>
                    <span className="form__error">{errors.minute && errors.minute.message}</span>
                </div>
                <div className="form__input-container">
                    <label className="form__input__title">Секунды</label>
                    <input
                        className="form__input hover"
                        type="number"
                        value={seconds}
                        {...register("second", {
                            onChange: handleSecondChange,

                        })}
                    >
                    </input>
                    <span className="form__error">{errors.second && errors.second.message}</span>
                </div>
            </fieldset>
            <div className="form__submit-container">
                <button className={"form__submit-button hover"}
                >{run === true? 'Остановить' : 'Запустить'}</button>

            </div>
        </form>
      
</div></>
    );
};

export default Timer;