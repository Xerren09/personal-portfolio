'use strict';

import { readFileSync, writeFileSync } from "fs";
import meta from "./meta.json" with { type: "json" };
import path from "path";

function InjectMetadata() {
    console.log(`Injecting HTML meta tags with data from ${path.join(__dirname, "meta.json")}`);

    console.log(`Reading template file ${path.join(__dirname, "/template/index.html")}`);
    let template = readFileSync(path.join(__dirname, "/template/index.html")).toString();

    const title = meta.name ? `${meta.name} | Portfolio` : "Portfolio";
    template = template.replaceAll("__TITLE__", title);
    console.log(`Injected TITLE with "${title}"`);

    const description = meta.description ? `${meta.description}` : "";
    template = template.replaceAll("__DESCRIPTION__", description);
    console.log(`Injected DESCRIPTION with "${description}"`);

    const name = meta.name ? `${meta.name}` : "";
    template = template.replaceAll("__NAME__", name);
    console.log(`Injected NAME with "${name}"`);

    const url = meta.url ? `${meta.url}` : "Portfolio";
    template = template.replaceAll("__URL__", `${url}`);
    console.log(`Injected URL with "${url}"`);

    const card = meta.url ? new URL("/card.png", meta.url).toString() : "./card.png";
    template = template.replaceAll("__IMAGE__", card);
    console.log(`Injected IMAGE with "${card}"`);

    const keywords = meta.keywords ? meta.keywords.toString() : "portfolio, cv, resume";
    template = template.replaceAll("__KEYWORDS__", keywords);
    console.log(`Injected KEYWORDS with "[${keywords}]"`);

    const noscript = meta.noscript ? meta.noscript : "This website requires you to enable JavaScript to view its content. Since it is not enabled, you may find the PDF version more useful? <a href=\"/CV.pdf\">Download PDF version</a>";
    template = template.replaceAll("__NOSCRIPT__", noscript);
    console.log(`Injected NOSCRIPT.`);

    writeFileSync(path.join(__dirname, "/index.html"), template, {  });

    console.log("index.html template meta tags populated using the meta.json file.");
}

export default function InjectMetadataPlugin() {
    let config;
    
    return {
        name: 'inject-meta',
        buildStart(options) {
            if (config.command !== 'serve') {
                InjectMetadata();
            }
        },
        configResolved(resolvedConfig) {
            config = resolvedConfig
        },
    };
}