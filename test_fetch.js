import fs from 'fs';

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

async function getOgImage(url, filename) {
    try {
        const html = await fetch(url).then(r => r.text());
        const match = html.match(/<meta property="og:image" content="([^"]+)"/);
        if (match) {
            console.log("Downloading", match[1], "to", filename);
            const res = await fetch(match[1], { headers });
            const buf = await res.arrayBuffer();
            fs.writeFileSync('./public/' + filename, Buffer.from(buf));
        } else {
            console.log("No og:image for", url);
        }
    } catch (e) {
        console.error("Error on", url, e.message);
    }
}

async function main() {
    await getOgImage('https://en.wikipedia.org/wiki/Alien:_Romulus', 'alienromulus.jpg');
}

main();
