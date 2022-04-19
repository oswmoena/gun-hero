import React, { useEffect } from 'react';
import './Shooter.css'
import Shotgun from '../assets/shotgun.png'

const keyTranslate = {
    ArrowUp: 1,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3,
}

export const Shooter = ({ gunPosition, setGunPosition }) => {

    const handleUserKeyPress = event => {
        const { key } = event;

        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
            setGunPosition(keyTranslate[key]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    });

    const showShotgun = () => {
        return <img src={Shotgun} className={"shotgun"} />
    }
    return (
        <div className={"container-shooter"}>
            <table className={'shooter-table'}>
                <tr>
                    <td className={'selected'}>{gunPosition === 2 && showShotgun()}</td>
                    <td className={'selected'}>{gunPosition === 1 && showShotgun()}</td>
                    <td className={'selected'}>{gunPosition === 3 && showShotgun()}</td>
                </tr>
            </table>
        </div>
    )
}