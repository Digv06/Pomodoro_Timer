import { useContext, useEffect, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsBtn from './SettingsBtn';
import SettingsContext from './SettingsContext';


const red = '#f54e4e'
const green = '#4aec8c'

function Timer() {

  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setisPaused] = useState(false);
  const [secondsLeft, setsecondsLeft] = useState(0);
  const [mode, setmode] = useState('work');

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick(){
    secondsLeftRef.current--;
    setsecondsLeft(secondsLeftRef.current);  
  }

  useEffect(() => {

    function switchMode(){
      const nextMode = modeRef.current === 'work'?'break':'work';
      const nextSeconds = (nextMode === 'work'? settingsInfo.workMinutes: settingsInfo.breakMinutes)*60;
      
      setmode(nextMode);
      modeRef.current = nextMode;
      
      setsecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds; 
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setsecondsLeft(setsecondsLeft.current);


    const interval = setInterval(() => {
      if(isPausedRef.current) return;

      if(secondsLeftRef.current === 0) return switchMode();
      
      tick();

    }, 1000);

    return () => clearInterval(interval);

  }, [settingsInfo]);


  const totalseconds = mode === 'work'? settingsInfo.workMinutes*60 : settingsInfo.breakMinutes*60;
  const percent = Math.round(secondsLeft/totalseconds*100);

  const minutes = Math.floor(secondsLeft/60);
  let seconds = secondsLeft%60;
  if(seconds<10) seconds += '0';





  return (
    <>
        <div>
            <CircularProgressbar value={percent} text={minutes+':'+seconds} styles = {buildStyles({
              textColor : '#fff',
              pathColor : mode === 'work'?red:green,
              trailColor: 'rgba(255,255,255,0.2)',

            })}/>
            <div style = {{marginTop : '30px'}}>
              {isPaused 
              ? <PlayButton onClick = {() => {setisPaused(false); isPausedRef.current = false; }}/> 
              : <PauseButton onClick = {() => {setisPaused(true); isPausedRef.current = true;}}/>}
            </div>
            <div style={{marginTop: '30px'}}>
              <SettingsBtn onClick = {() => settingsInfo.setshowSettings(true)}/>
            </div>
        </div>
    </>
  )
}

export default Timer
