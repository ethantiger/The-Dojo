import './Settings.css'
import LightDark from '../../assets/black-and-white-6671.svg'

const themeColors = ['#7547f7','#a71010', '#30a7c5', '#2cb34d','#ff8800']

export default function Themes({changeMode, changeColor, mode, color, handleClick}) {
    
    return (
        <div className={`theme-buttons ${mode ? null:'dark'}`}>
                <p className="settings-title">Themes:</p>
                <div className="settings-buttons">
                    <div className="mode-buttons" onClick={() => changeMode(mode ? false:true)}>
                        <p className={mode ? null:'active'}>Dark Mode</p>
                        <img 
                            className="light-dark" 
                            src={LightDark} alt="Light / Dark mode selector" 
                            style={{filter: mode ? 'invert(0%)': 'invert(100%)'}} 
                        />
                    </div>
                    <div className="color-buttons">
                        {themeColors.map(color => (
                            <div
                                key={color}
                                onClick={() => {
                                    const root = document.querySelector(':root')
                                    root.style.setProperty('--primary-color', color)
                                    changeColor(color)
                                }}
                                style={{ background:color }}
                            />
                        ))}
                    </div>
                </div>
                <button className={`${mode ? null:'dark'} btn`} onClick={handleClick}>Set as Default</button>
            </div>
    )
}