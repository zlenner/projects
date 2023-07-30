import parser from "./parser"
import fs from "fs"
import renderer from "./renderer"
import sass from "node-sass"

export const buildMD = () => {
    // Read file ./README.md
    const markdown = fs.readFileSync("./projects.md", "utf-8")

    const projects = parser(markdown)

    const html = renderer(projects)

    // Write file ./dist/index.html
    fs.writeFileSync("./dist/index.html", html)
}

export const buildCSS = () => {
    const {css} = sass.renderSync({
        file: "./style.scss",
    })

    // Write file ./dist/style.css
    fs.writeFileSync("./dist/style.css", css)
}

const build = () => {
    // Create dist if not exists
    if (!fs.existsSync("./dist")) {
        fs.mkdirSync("./dist")
    }

    buildMD()
    buildCSS()
}

export default build
