const urls = [
  'https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg', // 1917
  'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg', // blade runner
  'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg', // shawshank (wikipedia)
  'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', // shawshank alternative
  'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VKF5A6TnTCe.jpg', // john wick 4
  'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', // gotg 3
  'https://image.tmdb.org/t/p/w500/dMOPkPkCAlNkGrCDNNUz1RIcbhK.jpg', // knight of seven kingdoms
  'https://image.tmdb.org/t/p/w500/gUmFSaBn99jROdCx37MTiql9coZ.jpg', // takopi
  'https://image.tmdb.org/t/p/w500/pE8CScObQURsFZ723ELGnGMkFJM.jpg', // peaky blinders
  'https://image.tmdb.org/t/p/w500/iigTJJMwAemxGNaJbfMYEAw7Swd.jpg', // death note
  'https://image.tmdb.org/t/p/w500/oBB8sZIJWMGkga79V6P2bFd3hDL.jpg', // beef
  'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', // game of thrones
  'https://image.tmdb.org/t/p/w500/2gFMBBnSMFEMjnZCBSl2YBGTrhN.jpg', // mindhunter
];

async function check() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(url, res.status);
    } catch(e) {
      console.log(url, 'error');
    }
  }
}
check();
