import fs from "fs"
import build, { buildCSS, buildMD } from "./build"
import liveServer from "live-server"

const onChange = (type: "html" | "css") => {
    return () => {
        console.log(`\nChange detected in ${type}, rebuilding...`)
        const start = Date.now()
        try {
            if (type === "css") {
                buildCSS()
            } else {
                buildMD()
            }
        } catch (error) {
            console.log(`Error in build ${type}:`)
            console.log(error)
        } finally {
            console.log(`Build ${type} finished in ${Date.now() - start}ms`)
        }
    }
}

fs.watchFile("./style.scss", {interval: 200}, onChange("css"))
fs.watchFile("./projects.md", {interval: 200}, onChange("html"))

console.log(`Watching for changes at /dir...`)

liveServer.start({
    root: "./dist",
    logLevel: 1
});
