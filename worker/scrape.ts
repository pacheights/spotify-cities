// the scrape code that will go on the server

import { ArtistLocation, Cities } from "../types/spotify-scrape";

const puppeteer = require('puppeteer');
const getLocations = async (ids: string[]) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const locations: Cities = {}
    for (let id of ids) {
      const url = `https://open.spotify.com/artist/${id}/about`;
      await page.goto(url);
      try {
        await page.waitForSelector('#main', { timeout: 600 });
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
          if (locations[city]) {
            locations[city]["listeners"] = locations[city]["listeners"] + listeners;
            locations[city]["artists"] = [...locations[city]["artists"], id]
          } else {
            locations[city] = {
              listeners: listeners,
              artists: [id]
            };
          }
        })
      } catch (error) {
        console.log(id, error.toString().slice(0,50))
      }
    }

    await browser.close();
    return locations;
  } catch (error) {
    console.log(error);
  }
}

export default getLocations;
export { getLocations };