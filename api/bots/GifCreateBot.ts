import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { Canvas } from "canvas"
import { Readable } from "stream"
import Ffmpeg from 'fluent-ffmpeg'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

async function GifCreateBot(sampleToUse: string, name: string, repos: number, followers: number, following: number, bornDate: string) {
    
    const wait = (ms: number) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, ms)
        })
    }

    const filename = uuid()
    const savePath = `${__dirname}/storage/out/${filename}.gif`
    const sample = `${__dirname}/storage/samples/${sampleToUse}`
    
    const videoEditor = Ffmpeg().setFfmpegPath(ffmpegPath)

    const canvas = new Canvas(680, 680)
    const context = canvas.getContext("2d")
    const variables = { color: "rgb(255,0,0)", stroke: "rgb(0,0,0,0)" }
    if(sampleToUse == "idk.jpg") {
        variables.color = "rgb(0,0,0)"
        variables.stroke = "rgb(255,0,0)"
    }
    context.font = "100px sans-serif"
    context.fillStyle = variables.color
    context.strokeStyle = variables.stroke
    context.stroke()
    context.fillText(`${name}`, 10, 100)
    context.strokeText(`${name}`, 10, 100)
    context.fillText(`${repos}`, 10, 200)
    context.strokeText(`${repos}`, 10, 200)
    context.fillText(`${followers}`, 10, 300)
    context.strokeText(`${followers}`, 10, 300)
    context.fillText(`${following}`, 10, 400)
    context.strokeText(`${following}`, 10, 400)
    context.fillText(`${bornDate}`, 10, 500)
    context.strokeText(`${bornDate}`, 10, 500)

    const imageBuffer = canvas.toBuffer()

    const stream = Readable.from([imageBuffer])

    videoEditor.input(sample)
    videoEditor.input(stream)
    videoEditor.complexFilter("[0:v][1:v]overlay=0:0")
    videoEditor.outputOptions([
        "-loop","-1"
    ])
    videoEditor.saveToFile(savePath)
    
    await wait(1500)
    const image = fs.readFileSync(savePath) 
    const info = fs.statSync(savePath) 


    setTimeout(() => {
        fs.rmSync(savePath, { force: true, retryDelay: 100, recursive: true })
    }, 2000)

    return { data: image, info }
        
}

export { GifCreateBot }