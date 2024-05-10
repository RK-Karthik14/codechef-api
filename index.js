const axios = require('axios');
const jsdom = require('jsdom');
const express = require('express');
const cors = require('cors');
const { JSDOM } = jsdom;

const app = express();
app.use(cors());

app.get('/:handle', async (req, res) => {
    try {
        const handle = req.params.handle
        const response = await axios.get(`https://codechef.com/users/${handle}`);

        if (response.status === 200) {
            const html = response.data;
            const dom = new JSDOM(html);
            const document = dom.window.document;

            const handleElement = document.querySelectorAll('h1.h2-style')
            const starElement = document.querySelectorAll('span.rating')
            const lastContestElement = document.querySelector('.contest-name')
            const currRatingElement = document.querySelector('.rating-number')
            const ratingHeader = document.querySelector('.rating-header.text-center')
            const rankElements = document.querySelectorAll('.rating-ranks')
            const countryNameElement = document.querySelector('span.user-country-name')
            

            const content = []

            handleElement.forEach(ele =>{
                if(ele.textContent){
                    content.push(ele.textContent.trim())
                }
            });

            starElement.forEach(ele=>{
                if(ele.textContent){
                    content.push(ele.textContent.trim())
                }
            })
            
            const contestString = lastContestElement.textContent.trim()
            const endIndex = contestString.indexOf('(')
            const contestName = contestString.substring(0, endIndex).trim()
            content.push(contestName)

            content.push(currRatingElement.textContent.trim())

            if(ratingHeader){
                const maxRatingElement = ratingHeader.querySelector('small')
                const ratingString = maxRatingElement.textContent.trim()
                const startIndex = ratingString.lastIndexOf(' ')
                const rating = ratingString.substring(startIndex+1, ratingString.length-1)
                content.push(rating)
            }

            rankElements.forEach(ele=>{
                const strongElement = ele.querySelectorAll('strong')
                strongElement.forEach(se=>{
                    if(se.textContent){
                        content.push(se.textContent.trim())
                    }
                })
            })

            content.push(countryNameElement.textContent.trim())

            if (content.length > 0) {
                res.status(200).json({
                    success: true,
                    name: content[0],
                    currentRating: content[3],
                    highestRating: content[4],
                    globalRank: content[5],
                    countryRank: content[6],
                    stars: content[1], 
                    lastContest: content[2],
                    countryName: content[7],
                });
            } else {
                res.status(404).json({ success: false, error: 'No ratings found' });
            }
        } else {
            res.status(500).json({ success: false, error: `Failed to load: ${response.status}` });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

function extractNumericRating(text) {
    const matches = text.match(/\d+/);
    return matches ? parseInt(matches[0], 10) : null;
}

app.get('/', (req, res) => {
    res.status(200).send("Hi, you are at the right endpoint. Append /handle_of_user to the URL. For more information, visit the GitHub repo: https://github.com/RK-Karthik14/codechef-api. Thanks for 🌟");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});