const path = require('path');
const express = require('express');

const app = express();
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
app.use(express.static(publicDirPath));

app.get('/test', (req, res) => {
    res.json({test: 1})
})

app.listen(3000, () => {
    console.log('server up');
});