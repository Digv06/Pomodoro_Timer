import React, { useContext } from 'react'
import ReactSlider from 'react-slider'
import BackButton from './BackButton';
import SettingsContext from './SettingsContext'
import './slider.css'

function Settings() {
    const settingsInfo = useContext(SettingsContext);
  return (
    <div style={{textAlign:'left'}}>
       <label>Working for {settingsInfo.workMinutes}:00</label>
       <ReactSlider
        className={'slider'}
        thumbClassName = {'thumb'}
        trackClassName = {'track'}
        value = {settingsInfo.workMinutes}
        onChange = {newValue=>settingsInfo.setworkMinutes(newValue)}
        min = {1}
        max = {120}
       />
       <label>Break for {settingsInfo.breakMinutes}:00</label>
       <ReactSlider
        className={'slider green'}
        thumbClassName = {'thumb'}
        trackClassName = {'track'}
        value = {settingsInfo.breakMinutes}
        onChange = {newValue=>settingsInfo.setbreakMinutes(newValue)}
        min = {1}
        max = {120}
       />
       <div style={{textAlign:'center', marginTop:'30px'}}>
        <BackButton onClick = {() => settingsInfo.setshowSettings(false)}/>
       </div>
    </div>
  )
}

export default Settings
