import { useEffect } from "react";
import { useState } from "react"



export function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue);

    // run code after each render
    useEffect( () => {
        // after initial page load, see if value with that key in local storage
        // If so, update

        // ensure fully loaded on client side

        const stickyValue = window.localStorage.getItem(key)

        if (stickyValue !== null) {

            // Stored as json in local storage
            setValue(JSON.parse(stickyValue))
        }
    }, [key] )

    // Want to separate each piece of logic into their own calls
    useEffect( () => {
        // If value contenta change
        // Set local storage to that value
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value] )

    return [value, setValue]
}