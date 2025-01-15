import "../App.css";
import Header from "../components/Header";
import { router } from "../App";
import FFButton from "../components/FFButton";
import { padding } from "../lib/Constants";

export default function Home() {
    return (
        <div className="App-body-top">
            <Header text="fireflew.top" />
            <span>
                Hey, I'm Gordi! Welcome to my site. I keep this place updated with the latest things I've been working on. It's still in development–apologies if things look a bit empty.{"\n\n"}Click a category to get started:
            </span>
            <div style={{ height: padding * 2 }}></div>
            <FFButton title="Music" onClick={() => router.navigate("/music")} />
            <div style={{ height: padding * 4 }}></div>
            <span>
                This site is written in React and hosted on Vercel.
            </span>
        </div>
    )
}
