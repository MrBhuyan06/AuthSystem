import app from './app.js'

const {PORT}=process.env 


app.listen(PORT, (req, res) =>
{
    console.log(`Server is running at http://localhost:${PORT}/api/v1`);
})