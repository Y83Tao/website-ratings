import fs from 'fs';

const headers = {
    'User-Agent': 'RatingsApp/1.0 (test@example.com)'
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
    await getOgImage('https://en.wikipedia.org/wiki/Warfare_(film)', 'warfare.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Crash_Landing_on_You', 'crashlanding.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Fury_(2014_film)', 'fury.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Transformers:_Dark_of_the_Moon', 'transformers3.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/World_War_Z_(film)', 'worldwarz.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Hotel_Mumbai', 'hotelmumbai.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Superman_(2025_film)', 'superman25.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/I_Am_Mother', 'iammother.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Cyberpunk:_Edgerunners', 'cyberpunk.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Spy_%C3%97_Family', 'spyxfamily.jpg');
    await getOgImage('https://en.wikipedia.org/wiki/Avengers:_Infinity_War', 'infinitywar.jpg');
}

main();
