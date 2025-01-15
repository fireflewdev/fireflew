import { Colors, padding } from "../lib/Constants";

export default function ProjectHeader(props: { title: string, subtitle?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', }}>
            <br />
            <div style={{ width: "100%", height: 1, backgroundColor: Colors.text }} />
            <span id={"tsub" + props.title} className="App-tertiarytitle" style={{ paddingTop: padding }}>
                {props.title}
            </span>
            {props.subtitle ?
                <span id={"ssub" + props.title} style={{ fontStyle: 'italic', paddingBottom: padding }}>
                    {props.subtitle}
                </span> : <></>}
            <div style={{ width: "100%", height: 1, backgroundColor: Colors.text }} />
            <div style={{ height: padding }} />
        </div >
    )
}