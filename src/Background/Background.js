import React from 'react'
import './Background.css'
import {Boss} from '../Boss/Boss'

export const Background = () => {
    return (
        <div className={"container"}>
            <div className={"position-1"}>posición 1</div>
            <Boss/>
            <div className={"position-3"}>posición 3</div>
        </div>
    )
}
