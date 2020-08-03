import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ message: 'Olá'}));

app.listen(3333, () => {
    console.log('<3 Server started on port 3333!')
});
