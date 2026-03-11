import fs from 'fs';

const headers = {
    'User-Agent': 'RatingsApp/1.0 (test@example.com)'
};

async function downloadWikiImage(search, filename) {
    const s = encodeURIComponent(search);
    const pList = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${s}&utf8=&format=json`, { headers }).then(r => r.json());
    if (!pList.query.search.length) return;
    const title = encodeURIComponent(pList.query.search[0].title);
    const info = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`, { headers }).then(r => r.json());
    const pages = info.query.pages;
    const page = Object.values(pages)[0];
    if (page && page.thumbnail) {
        const url = page.thumbnail.source;
        console.log("Downloading", url, "to", filename);
        const imgRes = await fetch(url, { headers });
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync('./public/' + filename, Buffer.from(buf));
    } else {
        console.log("No thumbnail for", search);
    }
}

async function main() {
    await downloadWikiImage('John Wick Chapter 4 movie poster', 'jw4.jpg');
    await downloadWikiImage('A Knight of the Seven Kingdoms TV series 2025 poster', 'k7k.jpg');
    await downloadWikiImage('Takopi Original Sin manga volume 1', 'takopi.jpg');
    await downloadWikiImage('Peaky Blinders TV', 'pb.jpg');
    await downloadWikiImage('Death Note anime poster', 'dn.jpg');
    await downloadWikiImage('Beef miniseries poster', 'beef.jpg');
    await downloadWikiImage('Mindhunter TV series', 'mh.jpg');
}
main();
