import { Colors, padding } from "../lib/Constants"
import useWindowDimensions from "../lib/useWindowDimensions";
import Expandable from "./Expandable";
import Header from "./Header"
import "../App.css"


export type CustomShowcaseElementType = (props: CustomShowcaseElementProps) => JSX.Element;

export type CustomShowcaseElementProps = {
    title: string,
    subtitle?: string,
    description?: string,
}

export type ShowcaseItemType = {
    title: string,
    subtitle?: string,
    description?: string,
    template: CustomShowcaseElementType
}

export type ShowcaseSectionType = {
    title: string,
    expandable?: boolean,
    items: ShowcaseItemType[]
}

export default function ShowcasePage(props: { title: string, description: JSX.Element | JSX.Element[], sections: ShowcaseSectionType[] }) {
    const sections = props.sections;

    function scrollTo(id: string) {
        const dest = document.getElementById(id);
        // window.scrollTo(0, 100);
        const y = (dest?.getBoundingClientRect().top ?? 0) + window.scrollY;
        // dest?.scrollIntoView({ block: 'center' });
        console.log("scrolling to", y, dest?.getBoundingClientRect().top, window.scrollY,)

        window.requestAnimationFrame(() => {
            window.scrollTo({ top: y });
        })
    }

    //    <div  style="float:left; width: 150px; height: 150px; margin: 10px; background-color: #ff0000;">
    const maxWidth = 900;
    const margin = 250;
    const dim = useWindowDimensions();

    console.log("min", maxWidth + margin * 2, dim.width)
    const wideScreen = maxWidth + margin * 2 > dim.width;

    function TableOfContents() {
        return (
            <div style={{ border: 'solid', borderColor: Colors.text, padding: padding, minWidth: 200 }}>
                <span className="App-monotext" key={"contents"}>
                    Contents
                </span>
                {sections.map(e =>
                    <div style={{ width: "100%", display: 'flex', flexDirection: 'column', }} key={`contents_${e.title}`}>
                        <a href="#" className="App-monotext" onClick={() => scrollTo(e.title)} style={{ cursor: 'pointer', paddingTop: 5, fontWeight: 'bold', fontSize: 15 }}>
                            {e.title}
                        </a>
                        {e.items.map(sub =>
                            <a href="#" onClick={() => scrollTo("sub" + sub.title)} style={{ cursor: 'pointer', paddingLeft: 10, fontSize: 12 }} className="App-monotext">
                                {" - " + sub.title}
                            </a>

                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        // <div style={{ width: "100%" }}>
        <>
            <div style={{ paddingTop: padding, paddingLeft: padding, paddingRight: padding, width: "100%", maxWidth: 900, }}>
                <Header text={props.title} homeVisible />
            </div>
            <div style={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ flex: 1, height: 100, }}></div>
                    <div className="App-body-top" style={{ display: "block", paddingTop: 0, paddingLeft: padding, paddingRight: padding, paddingBottom: padding }}>
                        {props.description}
                        {wideScreen ? <div style={{ padding: padding, maxWidth: margin }}><TableOfContents /></div> : <></>}
                        {sections.map(e =>
                            <div id={e.title} style={{ paddingTop: 40 }} key={`eitems_${e.title}`}>
                                <Expandable text={e.title} disabled={!e.expandable}>
                                    {e.items.map(sub =>
                                        <div id={"sub" + sub.title} style={{ width: "100%" }} key={`sitems_${sub.title}`}>
                                            {sub.template({ title: sub.title, subtitle: sub.subtitle, description: sub.description })}
                                        </div>
                                    )}
                                </Expandable>
                            </div>
                        )}
                        <div style={{ paddingBottom: padding * 4 }}></div>
                    </div>
                    <div style={{ flex: 1, height: 100, }}></div>
                </div>
                <div style={{ flex: 0, position: 'fixed', top: padding, right: dim.width / 2 - maxWidth / 2 - margin, width: margin }}>

                    {!wideScreen ? <div style={{ paddingLeft: padding }}><TableOfContents /></div> : <></>
                    }
                </div>

            </div >
        </>
        // </div>

    )
}