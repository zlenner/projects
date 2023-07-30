import { marked } from "marked"
import { Project } from "./types"
import { JSDOM } from "jsdom"

function parser(markdown: string) {
    const projects: Project[] = []

    const html = marked.parse(markdown, {mangle: false, headerIds: false})
    const dom = new JSDOM(html)
    for (const element of dom.window.document.body.children) {
        if (element.tagName === "H1") {
            const link = element.querySelector("a")?.href ?? ""
            projects.push({
                title: element.textContent ?? "",
                link,
                snippet: ""
            })
        } else if (element.tagName === "PRE") {
            projects[projects.length - 1].snippet = element.textContent ?? ""
        }
    }

    return projects
}

export default parser