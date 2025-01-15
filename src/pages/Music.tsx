import "../App.css";
import Header from "../components/Header";
import { router } from "../App";
import FFButton from "../components/FFButton";
import { Colors, padding, radius } from "../lib/Constants";
import Expandable from "../components/Expandable";
import ShowcasePage, { CustomShowcaseElementProps } from "../components/ShowcasePage";
import AudioPlayer from 'react-h5-audio-player';
import SoundCloudPlayer from "react-player/soundcloud";
import './rhap.css';


// import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { createRef, useEffect, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import ReactPlayer from 'react-player'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import ProjectHeader from "../components/ProjectHeader";

const symbAudio =
    [
        [new Audio(require("./symb/grass_b.mp3")), new Audio(require("./symb/grass_t.mp3"))],
        [new Audio(require("./symb/cave_b.mp3")), new Audio(require("./symb/cave_t.mp3"))],
        [new Audio(require("./symb/desert_b.mp3")), new Audio(require("./symb/desert_t.mp3"))],
        [new Audio(require("./symb/storm_b.mp3")), new Audio(require("./symb/storm_t.mp3"))]
    ]




export default function Music() {
    const [songSrc, setSongSrc] = useState<string | undefined>("");
    const [playingSymbVideo, setPlayingSymbVideo] = useState(false);
    const [playingTipzyVideo, setPlayingTipzyVideo] = useState(false);
    const [playingVRVideo, setPlayingVRVideo] = useState(false);

    const [title, setTitle] = useState("");
    const player = createRef<H5AudioPlayer>();
    const videoPlayer = createRef<ReactPlayer>();
    const projectHeight = 70;

    const [sym, setSym] = useState<[HTMLAudioElement, HTMLAudioElement] | undefined | null>(null);

    function turnOffAudio() {
        if (sym) {
            sym[0].pause();
            sym[0].currentTime = 0;
            sym[1].pause();
            sym[1].currentTime = 0;
        }

        setSym(null);
        setSongSrc(undefined);
    }

    function turnOffVideos() {
        setPlayingSymbVideo(false);
        setPlayingTipzyVideo(false);
    }

    function GDIACTemplate(props: CustomShowcaseElementProps) {
        const [area, setArea] = useState(0);
        const [symVol, setSymVol] = useState<number>(0.1);

        const playDynAudio = () => {
            const base = symbAudio[area][0];
            const transform = symbAudio[area][1];
            setSym([base, transform]);

            base.loop = true;
            transform.loop = true;

            transform.volume = 1;//symVol ?? 0;

            base.play();
            transform.play();
        }

        const onBaseClick = () => {
            if (sym === null) setSym(undefined);
            setSymVol(0.01);
            // setSymVol(1);
        }

        const onTransformClick = () => {
            if (sym === null) setSym(undefined);
            setSymVol(1);
        }

        useEffect(() => {
            // symbAudio[area][1].volume = symVol;

            if (sym) {
                console.log("changed!");
                sym[1].volume = symVol ?? 0;//animate({ volume: symVol ?? 0 }, 1000);

            } else {
                if (sym === undefined) {
                    turnOffAudio();
                    turnOffVideos();
                    playDynAudio();
                    console.log("started!");
                }
            }
        }, [sym, symVol])

        function AreaButton(props: { title: string, area: number }) {
            return (<FFButton onClick={() => {
                setArea(props.area);
                if (sym) {
                    turnOffAudio();
                }
            }} title={props.title} disabled={area === props.area} opacityDisabled={false} color={area !== props.area ? Colors.secondary : Colors.background} backgroundColor={area !== props.area ? "#0000" : Colors.secondary} />)
        }

        function TransformButton(props: { selected: boolean, text: string, src: string, onClick: () => any }) {
            const [hover, setHover] = useState(1);

            return (
                <div onMouseEnter={() => setHover(0.7)} onMouseLeave={() => setHover(1)}
                    onClick={props.onClick}
                    style={{
                        opacity: props.selected ? 1 : hover, backgroundColor: props.selected ? Colors.secondary : "#0000",
                        cursor: "pointer", flex: 1, minHeight: 200, padding: padding, border: 'solid', borderWidth: 1, borderColor: Colors.secondary, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'
                    }}>
                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <img alt="transformed" src={props.src} width={100} style={{ imageRendering: 'pixelated' }} />
                    </div>
                    <div style={{ padding: padding }}>
                        <span className="App-subtitle" style={{ color: props.selected ? Colors.background : Colors.secondary }}>{props.text}</span>
                    </div>
                </div>
            )
        }

        return (
            // <div style={{ display: 'flex', flexDirection: 'column' }}>
            <>
                <ProjectHeader title={props.title} subtitle={props.subtitle} />
                <div style={{ paddingBottom: padding }}>
                    During my sophomore year at Cornell, I took CS 3152: Intro to Game Design. With a team of 7 other people, I developed the software and wrote the music for a 2D puzzle platformer titled <i>Symbiosis.</i> At the end of the semester, we demoed our game at a Showcase open to the public. Here's the trailer I produced for the game:
                </div>
                {/* <div style={{ width: "100%", display: "flex", justifyContent: 'center', backgroundColor: Colors.secondary + "20" }}> */}
                <ReactPlayer playing={playingSymbVideo} onStart={() => setPlayingSymbVideo(true)} ref={videoPlayer} style={{ backgroundColor: Colors.secondary + "16" }} width={"100%"} onPlay={() => {
                    //player.current?.setJumpTime(0);
                    turnOffVideos();
                    turnOffAudio();
                    setPlayingSymbVideo(true);
                }} url='https://gdiac.cs.cornell.edu/temp/showcase/gallery/symbiosis/trailer.mp4' controls />
                {/* </div> */}
                <div style={{ paddingTop: padding }}>You can check out and download the game <a href="https://gdiac.cs.cornell.edu/temp/showcase/gallery/symbiosis/" target="_blank" rel="noreferrer">here</a>. (Windows/Mac)</div>
                <div style={{ paddingTop: padding, paddingBottom: padding }}>
                    Something cool that I did was create an adaptive music engine–in other words, the game's music is influenced by your actions. In the game, you can transform into and out of different animal forms, and the rhythm/bass kicks in when you're in a transformed state.{"\n\n"}Here's a little demo of it in action (or <a href="https://soundcloud.com/fireflewmusic/sets/symbiosis-ost" target="_blank" rel="noreferrer">listen to the full soundtrack</a>):
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: padding }}>
                    <span>Area:</span>
                    <div style={{ width: padding }} />
                    <AreaButton title={"Grass"} area={0} />
                    <div style={{ width: padding }} />
                    <AreaButton title={"Cave"} area={1} />
                    <div style={{ width: padding }} />
                    <AreaButton title={"Desert"} area={2} />
                    <div style={{ width: padding }} />
                    <AreaButton title={"Storm"} area={3} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', }}>
                    <TransformButton text="Base" selected={sym ? symVol < 0.5 : false} src={require('./symb/Aelyn_Idle.gif')} onClick={onBaseClick} />
                    <div style={{ width: padding }} />
                    <TransformButton text="Transformed" selected={sym && symVol ? symVol > 0.5 : false} src={require('./symb/Player_Frog_Jump.gif')} onClick={onTransformClick} />
                </div>

                <div style={{ height: projectHeight }} />
            </>
            // </div>
        )
    }

    function TipzyTemplate(props: CustomShowcaseElementProps) {
        return (
            <>
                <ProjectHeader title={props.title} subtitle={props.subtitle} />
                <div style={{ paddingBottom: padding }}>
                    I'm the co-founder and lead frontend developer in a startup called Tipzy, a service based in New Orleans that uses AI to curate music and manage song requests in nightlife venues.

                    {"\n\n"}Our product is two fold: first, a business-side dashboard where bars can handle their music and requests. Second, a patron-facing web-app that allows users to request a song (potentially for a fee). My job as the front-end developer was to code up these interfaces and make sure they're intuitive to our clients.

                    {"\n\n"}Here's a demo I put together that shows the user flow for both ends:
                </div>
                {/* <div style={{ width: "100%", display: "flex", justifyContent: 'center', backgroundColor: Colors.secondary + "20" }}> */}
                <ReactPlayer playing={playingTipzyVideo} onStart={() => setPlayingTipzyVideo(true)} onPause={() => setPlayingTipzyVideo(false)} ref={videoPlayer} style={{ backgroundColor: Colors.secondary + "16" }} width={"100%"} onPlay={() => {
                    //player.current?.setJumpTime(0);
                    turnOffVideos();
                    turnOffAudio();
                    setPlayingTipzyVideo(true);
                }} url='https://www.youtube.com/watch?v=sLAdFxbJPek&t=6s&ab_channel=Tipzy' controls />
                {/* </div> */}
                <div style={{ paddingTop: padding }}>You can view the patron-facing side of Tipzy <a href="https://app.tipzy.app/" target="_blank" rel="noreferrer">here</a>!</div>
                <div style={{ paddingTop: padding, paddingBottom: padding }}>
                    I used <b>React, React Native & Expo</b> to develop web and mobile versions of the application (the mobile version is pending release). I used frameworks including <b>Google & Apple OAuth, Stripe, Spotify & Soundtrack, and OpenAI APIs</b>, and I prototyped pages in <b>Figma</b> to discuss with the team.
                    {"\n\n"} Business-wise, things have been great! We've raised over $50,000 in competition prizes, have set up in multiple bars in Louisiana and garnered hundreds of requests during the first month of release, under the advisorship of <a href="https://www.linkedin.com/in/alexluke/" target="_blank" rel="noreferrer">Alex Luke</a>, <a href="https://www.linkedin.com/in/chris-meaux-95006815/" target="_blank" rel="noreferrer">Chris Meaux</a> & <a href="https://www.linkedin.com/in/conway-solomon-00a98425/" target="_blank" rel="noreferrer">Conway Solomon</a>. Hoping to raise our first round by the end of March–so stay tuned!
                </div>
                <div style={{ height: projectHeight }} />
            </>

        )
    }

    function VRTemplate(props: CustomShowcaseElementProps) {
        return (
            <>
                <ProjectHeader title={props.title} subtitle={props.subtitle} />
                <div style={{ paddingBottom: padding }}>
                    In a world ruled by DAWs, the easiest way to lay out a melody or rhythm is to plot notes on a grid. While this method is quick, you're out of luck if you try to emulate a real instrument's performance unless you buy hardware to actually record into your DAW (Digital Audio Workstation–think Ableton, Logic, FL Studio, etc.)
                    {"\n\n"}Now with VR, we're able to interact with objects in a very organic fashion–we can whack things, drag things, and pick things up in ways that are natural to human movement. The goal of my project is to harness this "human error" to record notes and change parameters in your favorite DAW. <i>Put simply, I want to make a VR MIDI Controller!</i>

                    {"\n\n"}I had the priviledge of working along side Cornell Tech's grad students in the XR Collaboratory to create this application. Here's an early demo (volume up):
                </div>
                {/* <div style={{ width: "100%", display: "flex", justifyContent: 'center', backgroundColor: Colors.secondary + "20" }}> */}
                <ReactPlayer playing={playingVRVideo} onStart={() => setPlayingVRVideo(true)} onPause={() => setPlayingVRVideo(false)} ref={videoPlayer} style={{ backgroundColor: Colors.secondary + "16" }} width={"100%"} onPlay={() => {
                    //player.current?.setJumpTime(0);
                    turnOffVideos();
                    turnOffAudio();
                    setPlayingVRVideo(true);
                }} url='https://www.youtube.com/watch?v=UhiWDiMwNWk&ab_channel=GordonTenev' controls />
                {/* </div> */}
                <div style={{ paddingTop: padding }}>It's important to note that even though I'm inputting notes in VR, <b>the actual sound is coming from from Logic Pro X</b>. The way this works is I generate <b>Open Sound Control (OSC) signals</b> from the VR app, sent over my local network to my Macbook that has a program called <b>OSCullator</b> open that converts the OSC signals to MIDI CC signals, which can be read by any DAW. In some cases, this MIDI CC data would be evaluated by a program I'd write in Logic's <b>Scripter</b> (refer to the separate Velocity assignments for Velowhackables). Too much information at once? Here's a diagram of all that goes on:</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: padding }}>
                    <div style={{ flex: 1, }}>
                        <img alt="Extrudable" src={require("./vr/signalflow.png")} style={{ width: "100%" }}></img>
                    </div>
                    <div style={{ paddingTop: padding, width: "100%", textAlign: 'center' }}>Signal flow from VR to DAW</div>
                </div>
                <div style={{ paddingTop: padding }}>Unfortunately, right now I only have video footage of my first virtual device: the "Whackable". I'll explain what it does along with the other devices I created.</div>
                <ul>
                    <li>
                        <b>Whackable:</b> Hitting a Whackable with a drumstick will send a previously defined note at a velocity dependent on how hard you hit it. <i>Think of it like a drum pad that transmits notes.</i>
                    </li>
                    <li>
                        <b>Velowhackable:</b> Very similar to a whackable, except all it does is modify velocity data for a given instrument. Let's say you already have a drum sequence written out. By assigning each part of the drum (kick, snare, hats, etc.) to different Velowhackables, you can "air drum" out how the velocity of each part evolves in the sequence. Normally you'd have to assign a velocity to each note in an entire drum sequence (which could take forever and might not sound as natural)
                    </li>
                    <li>
                        <b>Extrudable:</b> Lets you edit 3 values at once. You control the position of a point within a box in 3D space–the X, Y and Z coordinates of that point within the box determine the values of the 3 parameters.
                    </li>
                </ul>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: padding / 2 }}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <img alt="Velowhackables" src={require("./vr/velowhackables.png")} style={{ width: "100%" }}></img>
                        </div>
                        <div style={{ paddingTop: padding, width: "100%", textAlign: 'center' }}>Velowhackables</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: padding / 2 }}>
                        <div style={{ flex: 1, }}>
                            <img alt="Extrudable" src={require("./vr/extrudable.png")} style={{ width: "100%" }}></img>
                        </div>
                        <div style={{ paddingTop: padding, width: "100%", textAlign: 'center' }}>Extrudable</div>
                    </div>
                </div>
                <div style={{ height: 50 }} />
            </>

        )
    }


    function MusicTemplate(props: CustomShowcaseElementProps & { src: string }) {
        const [small, setSmall] = useState(true);
        const audio = `/music/${props.src}.mp3`;

        return (
            // <div style={{ display: 'flex', flexDirection: 'column' }}>
            <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span id={"tsub" + props.title} className="App-tertiarytitle" style={{ paddingTop: padding }}>
                        {props.title}
                    </span>
                    {props.subtitle ?
                        <span id={"ssub" + props.title} style={{ fontStyle: 'italic', paddingBottom: padding }}>
                            {props.subtitle}
                        </span> : <></>}
                </div >
                <div style={{ paddingBottom: padding }}>
                    <FFButton color={songSrc !== audio ? Colors.secondary : Colors.background} backgroundColor={songSrc !== audio ? "#0000" : Colors.secondary} title={songSrc !== audio ? "Play" : "Playing"}
                        disabled={songSrc === audio}
                        opacityDisabled={false}
                        // leftComponent={src !== audio ?
                        //     <div style={{ paddingRight: padding }}>
                        //         <FontAwesomeIcon icon="face-clouds" style={{ color: 'purple' }} color={"red"} className="p-1" />
                        //     </div>
                        //     : <></>}
                        onClick={() => {
                            // player.load('/grass.mp3', {
                            //     autoplay: true,
                            //     html5: true
                            // });
                            // console.log("playing?", player.isLoading, player.isReady)
                            if (songSrc !== audio) {
                                setTitle(props.title);
                                turnOffVideos();
                                turnOffAudio();
                                setSongSrc(audio);
                            }
                            console.log("playing?", audio, player.current?.audio.current)
                        }} />

                </div>
                <div style={{ padding: padding, backgroundColor: Colors.secondary + "33", borderRadius: radius }}>
                    {small ? <></> : <span >
                        <b>Notes: </b>{props.description}
                    </span>}
                    {small ?
                        <div style={{ display: 'inline-flex', cursor: "pointer" }} onClick={() => setSmall(false)}>
                            <span className="onelinetext" style={{ flex: 1 }}>
                                <b>Notes: </b>{props.description}
                            </span>
                            <div style={{ fontWeight: 'bold', lineClamp: 1, flexShrink: 1, paddingLeft: "0.5em" }}>See more</div>
                        </div>
                        :
                        <div style={{ fontWeight: 'bold', paddingTop: padding, cursor: "pointer" }} onClick={() => setSmall(true)}>
                            Close
                        </div>}
                </div>
                <div style={{ height: 20 }} />
            </>
            // </div>
        )
    }

    return (
        <>
            <ShowcasePage
                title="Music"
                description={
                    <span>
                        Here's a selection of some of the music-related projects I've made!{"\n"}{"\n"}This includes my songs (however, most of these aren't released yet; you can check out what I've published <a target="_blank" rel="noreferrer" href={"https://push.fm/fl/fireflew"}>here</a>), and anything else related to music. I've tried to select works that showcase the extent of my abilities.{"\n"}{"\n"}There's a lot of information on this page–I dive in pretty deep on for some of my projects–if you prefer skipping around, use the <b>Contents</b> menu to jump to your desired location.{"\n"}{"\n"}All music here is performed, mixed, and mastered by me (unless otherwise specified).
                    </span>
                }
                sections={[
                    {
                        title: "Projects",
                        items: [
                            {
                                title: `Tipzy`,
                                subtitle: "2024-now: The first AI music platform for nightlife venues",
                                template: TipzyTemplate
                            },
                            {
                                title: `VR Companion App for Logic Pro`,
                                subtitle: "2023: XR Prototyping",
                                template: VRTemplate
                            },
                            {
                                title: `Symbiosis`,
                                subtitle: "2022: Game development & adaptive music",
                                template: GDIACTemplate
                            },
                        ]
                    },
                    {
                        title: "Songs",
                        items: [
                            {
                                title: `"REM"`,
                                subtitle: "Psychadelic rock & atonality",
                                description: `I wanted to experiment with the concept of atonality–a big inspiration was "How to Disappear Completely" by Radiohead. In the intro, a cacophony of intersecting electric guitar notes interrupts a gliding synth arpeggio. Throughout the song, the dissonant guitar and synth reappear in gliding patterns that don't subscribe to the harmony of the music in the traditional sense, but help create an ebb and flow of energy & evoke a slight unsettling feeling akin to being in a bad dream.
                                
                                All instruments, with the exception of the drums and bass, were performed and recorded by me.`,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "rem", ...props })
                            },
                            {
                                title: `"Walk The Plank"`,
                                subtitle: "Pirates, cowboys & collaboration?",
                                description: `This song was the result of a collaboration with the talented Elise Mochizuki (Akemi Elise on Spotify) and released on Cornell Music Production's annual compulation album. I can't stress how valuable it is to bounce ideas off of someone else in every stage up until the final mix.
                                
                                The art of working with other creatives is maintaining the delicate balance between knowing when to assert your ideas and when to sit back and listen. As someone who usually produces on my own, this was a great opportunity to practice that skill, and I truly believe we were able to bring out the best in each other!`,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "walktheplank", ...props })
                            },
                            {
                                title: `"Parasomnia"`,
                                subtitle: "Electronica piece in 7/8 that experiments with various production & composition techniques",
                                description: `My goal starting this project was to write a song in 7/8 that felt like it still flowed well rhythmically. The pluck playing throughout most of the song is actually the combination of 2 polymetric sequences (4/4 and 5/4) split between the left and right channels. The synth texture in the beginning was created in a similar manner but with more sequences, panned differently, each delayed slightly at differing amounts to create a chaotic, overwhelming sound. I can then fade this texture in and out to manage tension.
                                
                                To create the snare effect at (1:41), I sent my drum's snare to a separate aux channel, in which I added a very short reverb with 100% wetness, a delay, and a flanger. I can then automate the volume of this track to control this effect, which served well as a transition.
                                
                                Personally, I really enjoy the synth solo starting at (2:55). 😊 During the solo, the song modulates from Em to Cm. During the transition time (3:16) I also switch the time briefly to 6/8, which shortens the phrases by a beat, creating a feeling that the song is "skipping over" itself, which both adds energy and signals the listener a big change is happening.
                                
                                As a final note, to create the rising effect at (3:49), I took a sample of one of my screams and ran it through Waves's H-Delay with a feedback of slightly over 100%. This means that during each repetiton of the delayed audio, the volume will increase slightly. While this is happening, I slowly automate the delay of the reverb slightly down, which not only decreases the time between each repetition, but it also increases the pitch as well. A sound that gets louder, faster, and higher over time seems a riser to me!
                                `,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "parasomnia", ...props })
                            },
                            {
                                title: `"Run"`,
                                subtitle: "Electronica experiment into sound design & Logic's Ringshifter",
                                description: `The foundational element of this piece is the bitcrushed, chimey sound that plays constantly (created by layering an organ and a few mbiras–all Logic stock samples). This sound constantly evolves with the help of Logic's Ringshifter, which is, for our intents, a Ring modulator (modulates amplitude).
                                
                                The result sounds very metallic and almost scratchy. Notice how this sound can range from almost being background noise (0:44) to a device used for emphasis (1:18), to providing overwhelming energy–notice the transition at (1:00). Having one underlying sound guide the listener through the piece keeps a sense of familiarity and thus leaves more room for you to try weird things 😊

                                A few other small notes: it was very fun chopping up and using Apple's text-to-speech in creative work. And like my other electronica piece here, I experimented a bit with less conventional time signatures; this one's in 5/4!
                                `,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "run", ...props })
                            },
                            {
                                title: `"The Grass is Greener"`,
                                subtitle: "An experiment with convolution reverb",
                                description: `Convolution reverb normally aims to emulate real spaces by using an impulse response (a "click" sound reverberating in a space). When audio sample plays through this effect, it basically plays the impulse response, but filtered so that the frequencies that play match the frequencies of the original signal. The end result sounds like the original sound but played in the room the impulse response was gathered from.
                                
                                The catch is, impulse responses are just audio files–they can be of anything! For this song, I set an entire 3-minute long instrumental piece to be the impulse response. When playing a few short notes at varying times from a synthesizer into this reverb, the processed frequencies mix really nicely together to form ambient-like music.`,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "convolution", ...props })
                            },
                        ]
                    }
                ]}
            />
            <div style={{ height: 300 }}></div>
            {
                songSrc ?
                    <div style={{ position: 'fixed', bottom: 0, width: "100%", maxWidth: 900, backgroundColor: Colors.background, paddingTop: padding }}>
                        {/* <ReactAudioPlayer
                            src={src}
                            autoPlay
                            controls
                        /> */}
                        <span style={{ paddingLeft: padding, paddingRight: padding }}>Playing <b>{title}</b></span>
                        <AudioPlayer
                            ref={player}
                            // style={{ backgroundColor: Colors.background, color: Colors.text }}
                            autoPlay
                            src={songSrc}
                            showFilledProgress={true}
                            showDownloadProgress={false}
                            showJumpControls={false}

                            onPlay={e => console.log("onPlay")}
                        // other props here
                        />

                    </div > : <></>
            }
        </>
    )
}



// return (
//     <div className="App-body-top">
//         <Header text="Music" homeVisible />
//         <span>
//             Here's a selection of some of the music-related projects I've made!{"\n"}{"\n"}This includes my songs (which I release <a target="_blank" rel="noreferrer" href={"https://push.fm/fl/fireflew"}>here</a>), and other music-related projects. I've tried to select works that showcase the extent of my abilities:
//         </span>
//         <div style={{ height: padding * 2 }}></div>
//         <Expandable text="Songs">
//             <div>
//                 hi
//             </div>
//         </Expandable>
//         <Expandable text="Projects">
//             <div>
//                 hi
//             </div>
//         </Expandable>
//     </div>
// )