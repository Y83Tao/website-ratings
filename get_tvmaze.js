import fs from 'fs';

async function getTvmazeImage(q, filename) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${q}`).then(r => r.json());
    if (res.length && res[0].show.image) {
        const url = res[0].show.image.original;
        console.log("Downloading", url, "to", filename);
        const imgRes = await fetch(url);
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync('./public/' + filename, Buffer.from(buf));
    } else {
        console.log("No image for", q);
    }
}

async function main() {
    await getTvmazeImage('mindhunter', 'mh.jpg');
    await getTvmazeImage('beef', 'beef.jpg');
}

main();
