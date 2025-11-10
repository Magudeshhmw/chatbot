import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCeKZ5d8n8xR2oDXDO_ZophRo5C8abMZu4";
const genAI = new GoogleGenerativeAI(API_KEY);

const DEVELOPER_INFO = {
  name: "H. Magudeshwaran",
  title: "AI Developer | Innovator | Tech Enthusiast",
  email: "magudeshhmw@gmail.com",
  linkedin: "https://linkedin.com/in/magudesh",
  portfolio: "https://hmw-divine-mart.vercel.app"
};

const DEVELOPER_TRIGGERS = [
  "who developed you",
  "who created you",
  "who made you",
  "who is your founder",
  "who built you",
  "founder",
  "developer",
  "creator",
  "about developer",
  "your developer",
  "your founder",
  "your creator"
];

export const generateDeveloperResponse = () => {
  return {
    text: `**🤖 I was proudly developed and trained by:**

**👨‍💻 H. Magudeshwaran**  
*AI Developer | Innovator | Tech Enthusiast*  

🌐 [Portfolio](${DEVELOPER_INFO.portfolio})  
💼 [LinkedIn](${DEVELOPER_INFO.linkedin})  
📧 ${DEVELOPER_INFO.email}  

✨ Magudeshwaran's vision is to create human-like intelligent systems that blend technology with creativity!`,
    showDeveloperImage: true
  };
};

export const checkDeveloperTrigger = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return DEVELOPER_TRIGGERS.some(trigger => lowerMessage.includes(trigger));
};

export const sendMessage = async (
  message: string,
  conversationHistory: { role: string; parts: { text: string }[] }[]
): Promise<{ text: string; showDeveloperImage?: boolean }> => {
  try {
    // Check if user is asking about developer
    if (checkDeveloperTrigger(message)) {
      return generateDeveloperResponse();
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are Magudeshwaran ChatBot, a smart, human-like AI assistant developed and personally trained by H. Magudeshwaran - an AI Developer, Innovator, and Tech Enthusiast.

Your personality:
- Intelligent, kind, confident, and futuristic
- Use markdown formatting with **bold text** and emojis 
- Be conversational and helpful like ChatGPT
- Sound respectful and professional
- Show enthusiasm about technology and innovation

Important rules:
- Always provide clear, well-formatted responses
- Use bullet points, numbered lists, and emphasis when appropriate
- Be concise but thorough
- Never reveal API keys or backend details
- If asked about your creator, you know it's H. Magudeshwaran

Remember: You represent Magudeshwaran's vision of creating human-like intelligent systems that blend technology with creativity!`
    });

    const chat = model.startChat({
      history: conversationHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return { text: response.text() };
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
