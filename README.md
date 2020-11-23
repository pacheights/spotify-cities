## Spotify Cities

## Update Nov 22, 2020
Spotify has removed the /about section of their website, along with artists' top cities, therefore this project can no longer proceed. I'm going to leave it up as a relic to my more contemporary engineering abilities and in the event that they put that back on their site — or better yet in their API — I can continue development. 

### What is it?
Spotify Cities will tell someone what cities they should live in based on their music tastes.

### How does it work
A user will connect their Spotify account to Spotify Cities to let the app know of their favorite artists. Spotify Cities takes the artist IDs and scrapes their most popular cities from their respective Spotify web pages (ex https://open.spotify.com/artist/5INjqkS1o8h1imAzPqGZBb/about). It then combines them together and finds the list of cities the user most belongs in.

### What technologies are being used
- TypeScript as the primary programming language
- React for frontend
- Ant Design for UI components
- Node with Express for backend
- Puppeteer for web scraping 
- Google Maps for GeoLocation information and visualization

### What's left for development
- [x] Initialize react app
- [x] Initialize node server
- [x] Create scrape algorithm
- [x] Authorize Spotify accounts via OAuth
- [x] Make API request to get user's favorite artists
- [x] Scrape all of the favorite artist's locations
- [x] Create an endpoint to return formatted location information
- [x] Connect Google Maps to frontend
- [x] Call Places API on the city string to return lat long coordinates
- [x] Display Map frontend on hover of cities
- [ ] Create database table to store location information of artists (to prevent duplicate scrapes)
- [ ] Create database table to store lat long for city strings (to prevent duplicate Places API calls)
- [ ] Update frontend to hide map if no locations are to be displayed, hide "Connect" button if Spotify account is connected, and display a loading animation as the API is gathering location information