import "../App.css";
import Header from "../components/Header";
import { router } from "../App";
import FFButton from "../components/FFButton";
import { Colors, padding, radius } from "../lib/Constants";
import Expandable from "../components/Expandable";
import ShowcasePage, { CustomShowcaseElementProps } from "../components/ShowcasePage";
import AudioPlayer from 'react-h5-audio-player';
import './rhap.css';


// import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { createRef, useEffect, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import ReactPlayer from 'react-player'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

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


    const [title, setTitle] = useState("");
    const player = createRef<H5AudioPlayer>();
    const videoPlayer = createRef<ReactPlayer>();

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
                    During my sophomore year at Cornell, I took CS 3152: Intro to Game Design. With a team of 7 other people, I developed the software and wrote the music for a 2D puzzle platformer titled <i>Symbiosis.</i> At the end of the semester, we demoed our game at a Showcase open to the public. Here's the trailer I produced for the game:
                </div>
                {/* <div style={{ width: "100%", display: "flex", justifyContent: 'center', backgroundColor: Colors.secondary + "20" }}> */}
                <ReactPlayer playing={playingSymbVideo} onStart={() => setPlayingSymbVideo(true)} ref={videoPlayer} style={{ backgroundColor: Colors.secondary + "16" }} width={"100%"} onPlay={() => {
                    //player.current?.setJumpTime(0);
                    turnOffVideos();
                    turnOffAudio();
                    setPlayingSymbVideo(true);
                }} url='/music/symbiosis-trailer.mp4' controls />
                {/* </div> */}
                <div style={{ paddingTop: padding }}>You can check out and download the game <a href="https://gdiac.cs.cornell.edu/temp/showcase/gallery/symbiosis/" target="_blank" rel="noreferrer">here</a>. (Windows/Mac)</div>
                <div style={{ paddingTop: padding, paddingBottom: padding }}>
                    Something cool that I did was create a dynamic music engine–in other words, the game's music is influenced by your actions. In the game, you can transform into and out of different animal forms, and the rhythm/bass kicks in when you're in a transformed state.{"\n\n"}Here's a little demo of it in action:
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
                <div style={{ height: 20 }} />
            </>
            // </div>
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
                        Here's a selection of some of the music-related projects I've made!{"\n"}{"\n"}This includes my songs (however, most of these aren't released yet; you can check out what I've published <a target="_blank" rel="noreferrer" href={"https://push.fm/fl/fireflew"}>here</a>), and other music-related projects. I've tried to select works that showcase the extent of my abilities.{"\n"}{"\n"}All music here is performed, mixed, and mastered by me.
                    </span>
                }
                sections={[
                    {
                        title: "Songs",
                        items: [
                            {
                                title: `"The Grass is Greener"`,
                                subtitle: "An experiment with convolution reverb",
                                description: `This song came about while playing with convolution reverb. Convolution reverb normally aims to emulate real spaces by using an "impulse response" (a "click" sound reverberating in that space). When audio sample plays through this effect, it basically plays the impulse response, but filtered so that the frequencies that play match the frequencies of the original signal. The end result sounds like the original sound but played in the room the impulse response was gathered from.
                                
                                The catch is, impulse responses are just audio files–they can be of anything! For this song, I set an entire 3-minute long instrumental piece I made previously to be the impulse response. When playing a few short notes at varying times from a synthesizer into the reverb, the processed frequencies mix really nicely together to form ambient-like music.`,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "convolution", ...props })
                            },
                            {
                                title: `"REM"`,
                                subtitle: "Psychadelic rock & atonality",
                                description: `I wanted to experiment with the concept of atonality–a big inspiration was "How to Disappear Completely" by Radiohead. In the intro, a cacophony of intersecting electric guitar notes interrupts a gliding synth arpeggio. Throughout the song, the dissonant guitar and synth reappear in gliding patterns that don't subscribe to the harmony of the music in the traditional sense, but help create an ebb and flow of energy & evoke a slight unsettling feeling akin to being in a bad dream.
                                
                                All instruments, with the exception of the drums and bass, were performed and recorded by me.`,
                                template: (props: CustomShowcaseElementProps) => MusicTemplate({ src: "rem", ...props })
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
                        ]
                    },
                    {
                        title: "Projects",
                        items: [
                            {
                                title: `Symbiosis`,
                                subtitle: "Game produced as a part of Cornell's Game Design Initiative",
                                template: GDIACTemplate
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