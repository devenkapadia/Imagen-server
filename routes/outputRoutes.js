import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
// import notfound from '../assets/notfound.png'

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
    const { prompt } = req.body;
    console.log(prompt);
    const aiResponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });
    console.log(aiResponse)
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(200).json({ photo: "" })
    console.error(error);
    // res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;