import styles from "./banner.module.css"
import React from "react"

export function Banner() {
    return(
        <div className={styles.banner}>
            <h1 className={styles.header1}>
                GET <span> Movie </span>
                TICKETS
            </h1>
            <p>Select Movie Tickets in Advance</p>
            <p>Movies are mention below</p>

        </div>
    )
}