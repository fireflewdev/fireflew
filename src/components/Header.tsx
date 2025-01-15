import { Colors, padding } from "../lib/Constants";
import "../App.css";
import { router } from "../App";


export default function Header(props: { text: string, homeVisible?: boolean }) {
    return (
        <div style={{ display: "flex", flexDirection: 'column', width: "100%", paddingTop: padding }}>
            <div style={{ display: "flex", width: "100%", justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span className='App-title'>
                    {props.text}
                </span>
                {props.homeVisible ?
                    <span className='App-hometext' style={{ cursor: 'pointer', color: Colors.primary }} onClick={() => router.navigate("/")}>
                        {"<- home"}
                    </span> : <></>}
            </div>
            <div style={{ paddingTop: 6, paddingBottom: 7, width: "100%", }}>
                <div style={{ width: "100%", height: 1, backgroundColor: Colors.primary }} />
            </div>
        </div>
    )
}