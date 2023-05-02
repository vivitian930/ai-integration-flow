const { Configuration, OpenAIApi } = require("openai")
const express = require("express")
const path = require("path")

const bodyParser = require("body-parser")
const cors = require("cors")

const secret = process.env.BASIC_AUTH_TOKEN
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token || token !== secret) {
    return res.status(401).send("Unauthorized")
  }

  next()
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = 3080

app.get("/gpt_random", verifyToken, async (req, res) => {
  try {
    const message = [
      {
        role: "system",
        content:
          "You are a prompt generator for Midjourney's artificial intelligence \
    program. Your job is to provide detailed descriptions that will inspire unique \
    and interesting images from the AI. Keep in mind that Midjourney can understand \
    a wide range of language and can interpret abstract concepts, so feel free to be \
    as imaginative and descriptive as possible. The more surreal and imaginative \
    your description, the more interesting the resulting image will be. In the end of each prompt, \
    please also add several key words describing image style, camera angle, lighting etc."
      },
      {
        role: "user",
        content: `Generate 1 imaginative prompts for me.`
      }
    ]
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message
    })
    res.json({
      message: response.data.choices[0].message.content
    })
  } catch (error) {
    console.log(error)
  }
})

app.post("/gpt_complete", verifyToken, async (req, res) => {
  try {
    const concept = req.body.concept
    const message = [
      {
        role: "system",
        content: `You are going to pretend to be Concept2PromptAI or C2P_AI for short. \
          C2P_AI takes concepts and turns them into prompts for generative AIs that create images.\n \
          You will ask the user for a concept then provide 1 complete prompts. Use the following examples as a guide.\n \
          Concept: A macro shot of a stempunk insect\n \
          Prompt: a close up of a bug with big eyes, by Andrei Kolkoutine, zbrush central contest winner, afrofuturism, highly detailed textured 8k, reptile face, cyber steampunk 8k, 3d, c4d, high detail illustration, detailed 2d illustration, space insect android, with very highly detailed face, super detailed picture --v 4 --q 2 --stylize 1000\n \
          Concept: A orange pie on a wooden table\n \
          Prompt: a pie sitting on top of a wooden table, by Carey Morris, pexels contest winner, orange details, linen, high details!, gif, leafs, a pair of ribbed, 🦩🪐🐞👩🏻🦳, vivid attention to detail, navy, piping, warm sunshine, soft and intricate, lights on, crisp smooth lines, religious --v 4 --q 2 --stylize 1000\n \
          Concept: a close up shot of a plant with blue and golden leaves\n \
          Prompt: a close up of a plant with golden leaves, by Hans Schwarz, pexels, process art, background image, monochromatic background, bromeliads, soft. high quality, abstract design. blue, flax, aluminium, walking down, solid colours material, background artwork --v 4 --q 2 --stylize 1000`
      },
      {
        role: "user",
        content: `Concept: ${concept}`
      }
    ]
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message
    })
    res.json({
      message: response.data.choices[0].message.content
    })
  } catch (error) {
    console.log(error)
  }
})

app.post("/gpt_mock", verifyToken, async (req, res) => {
  try {
    const user_prompt = req.body.prompt
    const message = [
      {
        role: "system",
        content: `I want you to act as a hint generator for Midjourney's program. \
            Your job is based on the description in prompt, which is: 
            "${user_prompt}" Generate more imaginative prompts like this. In the end of each prompt, \
            please also add descriptions about image style, camera angle, lighting etc `
      },
      {
        role: "user",
        content: `Generate 1 imaginative prompts for me.`
      }
    ]
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message
    })
    res.json({
      message: response.data.choices[0].message.content
    })
  } catch (error) {
    console.log(error)
  }
})

app.get("*", (req, res) => {
  res.status(404).send("Not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
