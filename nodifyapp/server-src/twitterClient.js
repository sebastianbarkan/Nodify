import { TwitterApi } from "twitter-api-v2"

// const client = new TwitterApi({
//     appKey: "VJUbczcUBneYtCVPVCgISw6H6",
//     appSecret: "ugjxk2z8wcuiaSdizby88LG0txGuz8EMzqP4R1YbeTfyj4thIf",
//     accessToken: "1699251695212007424-gPUzaAvsudK3bxueUyv6bwSB7B1zaI",
//     accessSecret: "X660BxL0IHDpYxHTzw88C2EBP9roeIowMlgRUbfaNA757"
// })

const client = new TwitterApi({
        appKey: "Hm8E5OXohtxYfPsq68RQZY2W2",
        appSecret: "G3EExd5FS78mLcEl19JXBdTGCKAJ3Jwqupawvlak3BKRyvXvCM",
        accessToken: "1521475808866545664-CAugP4ojgcxdR6alyyDMQCIjFqZ0o3",
        accessSecret: "V5IQs6Wd3lalHZm3kQ3D8lWmePVx0xBUTLVSuhyUTlEHo"
    })
    

const rwClient = client.readWrite

export default rwClient