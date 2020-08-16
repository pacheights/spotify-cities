// the scrape code that will go on the server

import { ArtistLocation, Location } from "../types/spotify-scrape";

const puppeteer = require('puppeteer');
const getLocations = async (ids: number[]) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const locations: Location = {}
    for (let id of ids) {
      const url = `https://open.spotify.com/artist/${id}/about`;
      await page.goto(url);
      try {
        await page.waitForSelector('#main', { timeout: 700 });
  
        const artistLocations: ArtistLocation[] = await page.evaluate(() => {
          const cityElements = Array.from(document.querySelectorAll('.ArtistAbout__city__name'));
          const listenerElements = Array.from(document.querySelectorAll('.ArtistAbout__city__listeners'));
          const cities = cityElements.map(element => element.innerHTML);
          const listeners = listenerElements.map(element => element.innerHTML);
          
          return cities.map((city, index) => {
            const listenerNumber = parseInt(listeners[index].replace(/\D/g,''), 10);
            return {
              [city]: listenerNumber
            }
          })
        })

        artistLocations.map(locationObj => {
          const city = Object.keys(locationObj)[0];
          const listeners = parseInt(locationObj[city], 10);
          locations[city] = locations[city] ? locations[city] + listeners : listeners;
        })
      } catch (error) {
        console.log(id)
      }
    }

    const sortedLocations = Object.keys(locations)
    .map(location => ({[location]: locations[location]}))
    .sort((a, b) => b[Object.keys(b)[0]] - a[Object.keys(a)[0]])

    await browser.close();
    return sortedLocations;
  } catch (error) {
    console.log(error);
  }
}

export default getLocations;
export { getLocations };