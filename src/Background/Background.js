import React, { useState, useEffect } from 'react'
import './Background.css'
import { Boss } from '../Boss/Boss'
import { Shooter } from "../shooter/Shooter";

const keyTranslate = {
    ArrowUp: 1,
    ArrowDown: 1,
    ArrowLeft: 2,
    ArrowRight: 3,
}

export const Background = () => {

    const [bossPosition, setBossPosition] = useState(1)
    const [gunPosition, setGunPosition] = useState(1)
    const [level, setLevel] = useState(1)
    const [bossHP, setBossHP] = useState(2)
    const [bang, setBang] = useState(false)
    const [success, setSuccess] = useState(false);
    const [bossInterval, setBossInterval] = useState(1000);

    useEffect(() => {
        const interval = setInterval(() => {
            setBossPosition(random(1, 3))
        }, bossInterval);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setBang(false)
        }, 100);
        if (bang === true && (bossPosition === gunPosition)) {
            setBossHP(bossHP - 2)
        }
        if (bang === true && bossHP === 0) {
            setSuccess(true)
        }
        return () => clearInterval(interval);
    }, [bang]);

    useEffect(() => {
        if (bossHP === 0) {
            setSuccess(true)
        }
    }, [bossHP]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (success === true) {
                setLevel(level + 1)
                setBossHP(2)
                setSuccess(false)
                setBossInterval(bossInterval - 200)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [success]);

    useEffect(() => {
        console.log('bossInterval', bossInterval)
    }, bossInterval)


    const random = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const handleUserKeyPress = event => {
        const { code } = event;

        if (code === 'Space') {
            setBang(true)
        }
    };

    const handleSuccess = () => {
        return <h1>GANASTE!</h1>
    }

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    });



    return (
        <div>
            <div className={"info-bar"}>
                <div >Nivel: {level}</div>
                <div>{bang && "BANG!"}</div>
                <div >HP: {bossHP}</div>
            </div>
            <div className={"container"}>
                {success ?
                    (<h1>GANASTE!</h1>)
                    :
                    (<table className={'shooter-table'}>
                        <tr>
                            <td className={'selected'}>{bossPosition === 2 && <Boss />}</td>
                            <td className={'selected'}>{bossPosition === 1 && <Boss />}</td>
                            <td className={'selected'}>{bossPosition === 3 && <Boss />}</td>
                        </tr>
                    </table>)
                }
            </div>
            <Shooter gunPosition={gunPosition} setGunPosition={setGunPosition} />
        </div>
    )
}
