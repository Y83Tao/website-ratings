import fs from 'fs';

const headers = {
    'User-Agent': 'RatingsApp/1.0 (test@example.com)'
};

async function downloadWikiImageExact(title, filename) {
    const encTitle = encodeURIComponent(title);
    const info = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encTitle}&prop=pageimages&format=json&pithumbsize=500`, { headers }).then(r => r.json());
    const pages = info.query.pages;
    const page = Object.values(pages)[0];
    if (page && page.thumbnail) {
        const url = page.thumbnail.source;
        console.log("Downloading", url, "to", filename);
        const imgRes = await fetch(url, { headers });
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync('./public/' + filename, Buffer.from(buf));
    } else {
        console.log("No thumbnail for", title);
    }
}

async function main() {
    await downloadWikiImageExact('John Wick: Chapter 4', 'jw4.jpg');
    await downloadWikiImageExact('A Knight of the Seven Kingdoms (TV series)', 'k7k.jpg');
    await downloadWikiImageExact('Takopi\'s Original Sin', 'takopi.jpg');
    await downloadWikiImageExact('Peaky Blinders (TV series)', 'pb.jpg');
    await downloadWikiImageExact('Death Note', 'dn.jpg');
    await downloadWikiImageExact('Beef (miniseries)', 'beef.jpg');
    await downloadWikiImageExact('Mindhunter (TV series)', 'mh.jpg');
}
main();
