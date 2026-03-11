import fs from 'fs';

async function getOgImage(url, filename) {
    const html = await fetch(url).then(r => r.text());
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match) {
        console.log("Downloading", match[1], "to", filename);
        const res = await fetch(match[1]);
        const buf = await res.arrayBuffer();
        fs.writeFileSync('./public/' + filename, Buffer.from(buf));
    } else {
        console.log("No og:image for", url);
    }
}

async function main() {
    await getOgImage('https://en.wikipedia.org/wiki/John_Wick:_Chapter_4', 'jw4.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/A_Knight_of_the_Seven_Kingdoms_(TV_series)', 'k7k.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Takopi%27s_Original_Sin', 'takopi.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Peaky_Blinders_(TV_series)', 'pb.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Death_Note', 'dn.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Beef_(miniseries)', 'beef.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Mindhunter_(TV_series)', 'mh.jpg');
}

main();
