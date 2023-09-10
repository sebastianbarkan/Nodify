import styles from "./Home.module.css"
import React, { useEffect } from "react"
import scroll from "../../assets/scroll.jpg"
import gitcoin from "../../assets/gitcoin.png"
import sync from "../../assets/sync.jpg"
import ethsymbol from "../../assets/ethsymbol.jpg"

export default function Home() {

    return (
        <main className={styles.wrapper}>
            <section className={styles.hero}>
                <h1 className={styles.head}>
                    News immutable and verified, as it should be.
                </h1>
                <p className={styles.sub}>
                    Using Gitcoin Passport to help citizen journalism flourish on-chain and establishing a link between news media, crowdfunding to finance journalism, and regernated economies for contributing to the verified journalism ecosystem.
                </p>
                <div className={styles["button-wrap"]}>
                    <button className={styles["btn-main"]}>Join the Network</button>
                    <button className={styles["btn-second"]}>learn more</button>
                </div>
            </section>
            <section className={styles.sponsors}>
                <h4 className={styles.powered}>Powered by</h4>
                <div className={styles["sponsor-wrap"]}>
                    <img src={gitcoin} className={styles.sponsor} />
                    <img src={sync} className={styles.sponsor} />
                    <img src={scroll} className={styles.sponsor} />
                </div>
            </section>
            <img src={ethsymbol} className={styles.eth} />
        </main>
    )
}