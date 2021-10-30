import express from 'express'
import { GifCreateBot } from '../bots/GifCreateBot'
import request from 'request'
import axios from 'axios'

const app = express()

interface IGithubUser { 
    login: string, 
    public_repos: number, 
    followers: number, 
    following: number, 
    created_at: string 
}

app.get("/gif/:user", async (req,res) => {
    const { user } = req.params
    const { login, public_repos, followers, following, created_at } = await axios(`https://api.github.com/users/${user}`).then(r => r.data) as IGithubUser
    const gif = await GifCreateBot("idk.jpg", login ,public_repos, followers, following, created_at)
    
    res.writeHead(200, {
        "Content-Type": "image/gif",
        "Content-Length": gif.info.size
    })
    res.end(gif.data, "binary")
})

app.get("/html", (req,res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.listen(3001, () => console.log("server running on 3001"))