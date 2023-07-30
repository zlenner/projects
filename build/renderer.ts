import { Project } from "./types"

function renderer(projects: Project[]): string {
    let html: string = `<head></head><link rel="stylesheet" href="./style.css">`
    for (const project of projects) {
        html += `<a class="project" href="${project.link}">`
        html += `<h1>${project.title}</h1>`
        html += `<pre>${project.snippet}</pre>`
        html += `</a>`
    }
    return html
}

export default renderer