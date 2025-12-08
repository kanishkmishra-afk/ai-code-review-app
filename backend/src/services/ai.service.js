import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIs=null;
function getClient(){
  if(!genAIs){
   genAIs = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

}
return genAIs;
}
// Main function to generate code review
async function generateCodeReview(code, language) {
  console.log("Gemini API Key:", genAIs);
  try {
    const genAI = getClient();
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `
You are a senior software engineer.

Review the following code and return a detailed analysis including:
- Bugs or logical issues
- Security issues
- Performance or optimization improvements
- Best practices violations
- Improvements to readability and structure
- Recommended corrected version (if needed)

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Respond in **clean Markdown format**.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text;

  } catch (error) {
    console.error("AI Review Error:", error);
    // throw new Error("Failed to generate code review");
    return false
  }
}

export default generateCodeReview;
