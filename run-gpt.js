import OpenAI from "openai";
import fs from "fs";
import path from "path";

export default async function runGPT(imagePath) {
  const openai = new OpenAI();
  const base64Image = fs.readFileSync(imagePath, "base64");

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: "Just an answer" },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${base64Image}`,
          },
        ],
      },
    ],
  });

  saveResponse(response.output_text);
  return "GPT task completed......";
}

function saveResponse(response) {
  const OUTPUT_FOLDER = path.join(process.env.HOME, "Desktop", "Response.txt");
  fs.writeFileSync(OUTPUT_FOLDER, response);
}