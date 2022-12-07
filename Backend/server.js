import app from './app.js'

const {PORT}=process.env || 4000

app.listen(PORT, (req, res) =>
{
    console.log(`Server is running at http://localhost:${PORT}`);
})