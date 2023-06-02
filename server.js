
import captureWebsite from 'capture-website';
import axios from 'axios';
import cheerio from 'cheerio';

(async () => {
    const cards = [];
    const url = 'https://bento.me/estebanjs';
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Extract all the links from the children components
    $('.bento-grid__item').each((index, element) => {
        const link = $(element).find('.bento-item__content a').attr('href');
        cards.push({ index: index, link: link, image: null })
    });

    for (let card of cards) {
        const fileName = `images/${card?.index}.png`;
        await captureWebsite.file('https://bento.me/estebanjs', fileName, {
            defaultBackground: false,
            element: `.bento-grid__item:nth-child(${card?.index + 1})`
        });
        card.image = fileName;
    }
    console.log(cards)
})();
