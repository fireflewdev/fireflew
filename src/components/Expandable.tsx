import { Colors, padding } from "../lib/Constants";
import "../App.css";
import { router } from "../App";
import { useState } from "react";


export default function Expandable(props: { text: string, homeVisible?: boolean, initialValue?: boolean, children?: JSX.Element | JSX.Element[], disabled?: boolean }) {
    const [expand, setExpand] = useState(props.initialValue ?? (props.disabled ? true : false));

    return (
        // <div style={{ display: "flex", flexDirection: 'column', paddingTop: padding, color: Colors.secondary }}>
        <>
            <div style={{ display: "block", width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                <span onClick={() => { if (!props.disabled) { setExpand(!expand) } }} style={{ cursor: 'pointer', }} className='App-subtitle'>
                    {props.text}
                    {props.disabled ? <></> :
                        <span className='App-hometext'>
                            {expand ? " (click to close)" : " (click to expand)"}
                        </span>}
                </span>
            </div>
            {expand ? props.children : <></>}
        </>
        // </div>
    )
}