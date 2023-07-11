import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
import express from 'express';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from AI' });
});

router.route('/').post(async (req, res) => {
    try {
        const { message } = req.body;
        console.log(message);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        });
        res.json({
            message: response.data.choices[0].text
        })
    } catch (error) {
        res.json({
            message:'You just need to make a new acc in openAI to get free API reqeusts, Please do so before asking any queries because I cannot be able to connet with the openAI to resolve your query'
        })
        console.error(error);
        // res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
});

export default router;