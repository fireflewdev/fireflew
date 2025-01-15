import { router } from "../App";
import FFButton from "../components/FFButton";
import Header from "../components/Header";
import { Colors, padding } from "../lib/Constants";

export function NotFoundPage(props: { title?: string, body: string, backPath: string | -1 }) {
    return (
        <div className="App-body" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: padding }}>
            {/* <span className="App-title" style={{ color: Colors.primary, }}>{props.title ?? "Oops!"}</span> */}
            <Header text={props.title ?? "404"} />
            <span className="App-normaltext" style={{ paddingTop: padding, paddingBottom: padding * 2 }}>{props.body}</span>
            {/* <span className="App-normaltext" style={{ color: Colors.primary, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
                window.location.reload();
            }}>Reload</span> */}
            <FFButton title="Home" onClick={() => {
                if (props.backPath === -1) window.location.reload();
                else router.navigate(props.backPath);
            }}></FFButton>

            {/* <span className="App-normaltext" style={{ color: Colors.primaryRegular, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {
                if (props.backPath === -1) window.location.reload();
                else router.navigate(props.backPath);
            }}>Go back</span> */}
        </div>
    )
}