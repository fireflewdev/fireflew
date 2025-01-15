import { useState } from 'react';
import { Colors, padding, radius } from '../lib/Constants';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle as faSuccess, faXmarkCircle as faFailure } from '@fortawesome/free-solid-svg-icons';
import "../App.css";

function FFButton(props: { onClick?: () => void; title?: string, backgroundColor?: string, width?: number | string, disabled?: boolean, fontSize?: number, color?: string, loading?: boolean, completed?: boolean, leftComponent?: JSX.Element, animateglow?: boolean, opacityDisabled?: boolean }) {
    const [opacity, setOpacity] = useState(1);
    const opacityDisabled = props.opacityDisabled ?? true;

    return (
        <button
            // className={props.animateglow ? 'App-animated-gradient-fast' : undefined}
            disabled={props.disabled || props.loading || props.completed}
            onClick={() => { if (!props.disabled && props.onClick) props.onClick() }}
            onPointerLeave={() => {
                setOpacity(1);
            }}
            onPointerEnter={() => {
                setOpacity(0.85);
            }}
            onPointerDown={() => {
                setOpacity(0.5);
            }}
            onPointerUp={() => {
                setOpacity(1);
            }}
            style={{
                padding: padding,
                backgroundColor: props.backgroundColor ?? "#0000",
                display: 'flex',
                justifyContent: 'center', alignItems: 'center',
                width: props.width,
                boxSizing: "border-box",
                WebkitBoxSizing: "border-box",
                MozBoxSizing: "border-box",
                opacity: props.disabled ? (props.opacityDisabled ? 0.5 : 1) : props.completed || props.loading ? 1 : opacity,
                border: 'solid 1px',
                borderColor: Colors.secondary,
                boxShadow: props.animateglow ? '0px 0px 10px white' : undefined,
            }}
        >
            {props.completed !== undefined ?
                <FontAwesomeIcon icon={props.completed ? faSuccess : faFailure} fontSize={props.fontSize} color={props.color ?? "white"}></FontAwesomeIcon>
                :
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {props.leftComponent ?? <></>}
                    <span className='ffbutton-text'
                        style={{ color: props.color ?? Colors.secondary, fontWeight: 500, fontSize: props.fontSize }}>{props.title ?? ""}</span>
                    {props.loading ? <div style={{ paddingLeft: 5 }}><Spinner style={{ color: props.color, paddingTop: 3 }} size='sm' ></Spinner></div> : <></>}
                </div>
            }

        </button>
    )
}

export default FFButton;