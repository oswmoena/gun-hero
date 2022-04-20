import React, { useState, useEffect } from 'react'
import './Background.css'
import { Boss } from '../Boss/Boss'
import { Shooter } from "../shooter/Shooter";
import { Explotion } from '../Explotion/Explotion';

const INITIAL_BOSSLIFE = 6
const INITIAL_BOSS_INTERVAL = 1000
const INIT_SUCCESS = {
    message: false,
    gif: false
}

export const Background = () => {

    const [bossPosition, setBossPosition] = useState(1)
    const [bossPositionDeath, setBossPositionDeath] = useState(0)
    const [gunPosition, setGunPosition] = useState(1)
    const [level, setLevel] = useState(1)
    const [bossHP, setBossHP] = useState(INITIAL_BOSSLIFE)
    const [bang, setBang] = useState(false)
    const [success, setSuccess] = useState(INIT_SUCCESS);
    const [bossInterval, setBossInterval] = useState(INITIAL_BOSS_INTERVAL)

    useEffect(() => {
        const interval = setInterval(() => {
            setBossPosition(random(1, 3))
        }, bossInterval);
        return () => clearInterval(interval);
    }, [bossInterval]);

    useEffect(() => {
        const interval = setInterval(() => {
            setBang(false)
        }, 100);
        if (bang === true && (bossPosition === gunPosition)) {
            setBossPositionDeath(bossPosition)
            setBossHP(bossHP - 2)
        }
        if (bang === true && bossHP === 0) {
            setSuccess({ message: true, gif: true })
        }
        return () => clearInterval(interval);
    }, [bang]);

    useEffect(() => {
        if (bossHP === 0) {
            setSuccess({ message: false, gif: true })
        }
    }, [bossHP]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (success.message === true) {
                setLevel(level + 1)
                setBossHP(INITIAL_BOSSLIFE)
                setSuccess(INIT_SUCCESS)
                if (bossInterval > 50) {
                    setBossInterval(bossInterval - 50)
                } else if (bossInterval > 25) {
                    setBossInterval(bossInterval - 25)
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [success.message]);

    const random = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const handleUserKeyPress = event => {
        const { code } = event;

        if (code === 'Space') {
            setBang(true)
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, []);

    useEffect(() => {

        if (success.gif) {
            // setSuccess({ message: true, gif: false })
        }

        // return console.log('success', success)
    }, [success]);



    return (
        <div className={"background"}>
            <div className={"info-bar"}>
                <div >Nivel: {level}</div>
                {/* <div>{bang && "BANG!"}</div> */}
                <div>Press SPACE to shot</div>
                <div className={'hp-content'} >
                    HP:
                    <div className={'hp-bar'}>
                        <div className={'hp-bar-rest'} style={{ width: `${bossHP}%` }}></div>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                {success.gif ?
                    success.message ?
                        (<h1 style={{ color: "white" }}>ENEMIGO ABATIDO</h1>)
                        :
                        (<table className={'shooter-table'}>
                            <tr>
                                <td className={'selected'}>{bossPositionDeath === 2 && <Explotion />}</td>
                                <td className={'selected'}>{bossPositionDeath === 1 && <Explotion />}</td>
                                <td className={'selected'}>{bossPositionDeath === 3 && <Explotion />}</td>
                            </tr>
                        </table>)
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
            <Shooter gunPosition={gunPosition} setGunPosition={setGunPosition} bang={bang} />
        </div>
    )
}