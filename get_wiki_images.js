const titles = {
    'John Wick: Chapter 4': 'John_Wick:_Chapter_4',
    'A Knight of the Seven Kingdoms': 'A_Knight_of_the_Seven_Kingdoms_(TV_series)',
    'Takopi Original Sin': 'Takopi\'s_Original_Sin',
    'Peaky Blinders': 'Peaky_Blinders_(TV_series)',
    'Death Note': 'Death_Note',
    'Beef': 'Beef_(miniseries)',
    'Game of Thrones': 'Game_of_Thrones',
    'Mindhunter': 'Mindhunter_(TV_series)',
    '1917': '1917_(2019_film)',
    'Guardians of the Galaxy Vol. 3': 'Guardians_of_the_Galaxy_Vol._3',
    'Blade Runner': 'Blade_Runner',
    'The Shawshank Redemption': 'The_Shawshank_Redemption'
};

async function getImages() {
    const results = {};
    for (const [key, title] of Object.entries(titles)) {
        try {
            const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=500`;
            const res = await fetch(url).then(r => r.json());
            const pages = res.query.pages;
            const firstPage = Object.values(pages)[0];
            if (firstPage.thumbnail) {
                results[key] = firstPage.thumbnail.source;
            } else {
                results[key] = null;
            }
        } catch (e) {
            results[key] = 'error';
        }
    }
    console.log(JSON.stringify(results, null, 2));
}

getImages();
