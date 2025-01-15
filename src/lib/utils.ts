import { useCallback, useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";

export const goodETA = 600000;
export const okETA = 180000;
export const etaBuffer = -7000;

//TODO: CHANGE THIS!
export function stringArrayToStringFormatted(a: Array<string>) {
    if (a.length === 0) return "";

    let o = "";

    for (const v of a) {
        o += `, ${v}`;
    }

    return (o.substring(2))
}

export const onlyAlphanumeric = (str: string): string => {
    return str.replace(/[^0-9A-Z]+/gi, "");
}

export const onlyAlphanumericSpaces = (str: string): string => {
    return str.replace(/[^0-9A-Z ]+/gi, "");
}

export function millisToMinutesAndSeconds(millis: number) {
    let minutes = Math.floor(millis / 60000);
    let seconds = Math.floor((millis % 60000) / 1000);
    return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}

export function millisToHoursMinutes(millis: number) {
    let hours = Math.floor(millis / 3600000);
    let minutes = Math.floor((millis % 3600000) / 60000);
    return (
        (hours > 0 ? `${hours} hours ` : "") +
        (minutes > 0 || hours === 0 ? `${minutes} minute${minutes !== 1 ? "s" : ""}` : ""));
}

export function useInterval(callback: () => any, delay: number, firstDelay?: number, startFirstDelay?: boolean): void {

    const [enabled, setEnabled] = useState(true);
    const [d, setdi] = useState((startFirstDelay ? firstDelay : delay) ?? delay);
    const setd = (n: number) => {
        if (n !== d) setdi(n);
    }
    // let enabled = true;
    // const setEnabled = (e: boolean) => {enabled = e;}

    const savedCallback = useRef<typeof callback>();

    const onVisChange = () => {
        if (document.hidden) {
            if (enabled) {
                setEnabled(false);
                console.log("Tab is now hidden. Disabling useInterval");
            }
        }
        else {
            if (!enabled) {
                setd(firstDelay ?? delay);
                setEnabled(true);
                console.log("Tab is now in focus. Enabling useInterval");
            }
        }
    };

    // Remember the latest callback.
    useEffect(() => {
        document.addEventListener("visibilitychange", onVisChange);

        savedCallback.current = callback;

        onVisChange();

        // Specify how to clean up after this effect:
        return () => {
            document.removeEventListener("visibilitychange", onVisChange);
        };

    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (delay !== null) setd(delay);
            // console.log("tick ended. enabled",enabled);
            if (enabled) savedCallback.current ? savedCallback.current() : (() => { })()
        }
        if (delay !== null) {
            // console.log(d);
            let id = setInterval(tick, d);
            return () => { clearInterval(id); }
        }
    }, [d, enabled]);
}

export function useCallbackRef<T>(): [T | null, (node: T | null) => void] {
    const [o, so] = useState<T | null>(null);
    const ref = useCallback((node: T | null) => {
        if (node !== null) {
            so(node);
        }
    }, []);
    return [o, ref];
}