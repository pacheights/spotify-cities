// the scrape code that will go on the server

const puppeteer = require('puppeteer');
const url = 'https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb/about';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('#main', { timeout: 200 });

    const stuff = await page.evaluate(() => {
      const cityElements = Array.from(document.querySelectorAll('.ArtistAbout__city__name'));
      const listenerElements = Array.from(document.querySelectorAll('.ArtistAbout__city__listeners'));
      const cities = cityElements.map(element => element.innerHTML);
      const listeners = listenerElements.map(element => element.innerHTML);
      
      const obj = cities.map((city, index) => {
        const listenerNumber = parseInt(listeners[index].replace(/\D/g,''), 10);
        return {
          [city]: listenerNumber
        }
      })

      return obj
    })

    console.log(stuff);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();