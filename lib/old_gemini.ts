import { GoogleGenerativeAI } from "@google/generative-ai";
import { RateLimiter } from "./rateLimiter";
import { ResponseCache } from "./cache";

// Initialize rate limiter (60 requests per minute)
const rateLimiter = new RateLimiter(60);

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function getGeminiResponse(
  prompt: string,
  chatHistory: Array<{ role: string; text: string }> = []
) {
  try {
    // Check cache first
    const cacheKey = ResponseCache.generateKey(prompt, chatHistory);
    const cache = ResponseCache.getInstance();
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Wait for rate limiter token before proceeding
    await rateLimiter.waitForToken();

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const structuredPrompt = `Please provide a comprehensive response in the following structure:

**Topic Overview:**
[Brief introduction to the topic]

**Definitions & Concepts:**
• Technical Term 1: [Definition]
• Technical Term 2: [Definition]
• Related Concepts: [Brief explanation]

**Detailed Analysis:**
[In-depth explanation of the topic with technical details]

**Malaysian Regulatory Framework:**
1. MFRS/IFRS Standards:
   • Applicable Standards: [List relevant standards]
   • Key Requirements: [Main compliance points]
   • Recent Updates: [Any new changes]

2. Companies Act 2016:
   • Relevant Sections: [Specific sections]
   • Compliance Requirements: [Key obligations]
   • Statutory Deadlines: [Important dates]

3. Tax Implications:
   • Tax Laws: [Applicable regulations]
   • Tax Rates: [Current rates]
   • Filing Requirements: [Deadlines and procedures]

**Industry Best Practices:**
1. Documentation Requirements:
   • Required Records
   • Filing Systems
   • Retention Periods

2. Internal Controls:
   • Key Control Points
   • Risk Management
   • Audit Trail Requirements

**Malaysian Context:**
1. Local Business Environment:
   • Market Considerations
   • Industry Norms
   • Cultural Factors

2. Practical Considerations:
   • Common Challenges
   • Local Business Practices
   • Implementation Tips

**Case Studies:**
1. Example Scenario:
   • Situation
   • Analysis
   • Solution
   • Outcome

2. Common Pitfalls:
   • Issues to Avoid
   • Risk Factors
   • Mitigation Strategies

**Step-by-Step Guidelines:**
1. Implementation Steps:
   • Step 1: [Detail]
   • Step 2: [Detail]
   • Step 3: [Detail]

2. Timeline:
   • Planning Phase
   • Implementation Phase
   • Review Phase

**Professional Guidelines:**
1. MIA Requirements:
   • Professional Standards
   • Ethical Considerations
   • Reporting Requirements

2. Industry Standards:
   • Quality Control
   • Documentation
   • Review Procedures

**References & Resources:**
1. Regulatory Sources:
   • Government Publications
   • Professional Bodies
   • Industry Guidelines

2. Additional Resources:
   • Useful Tools
   • Templates
   • Further Reading

**Expert Tips:**
• Best Practices
• Common Mistakes to Avoid
• Efficiency Improvements

**Technology Considerations:**
• Recommended Software
• Digital Tools
• Automation Opportunities

**Cost Implications:**
• Initial Setup Costs
• Ongoing Expenses
• Potential Savings

**Conclusion:**
• Key Takeaways
• Action Items
• Next Steps

User Query: ${prompt}`;

    // Start a chat session
    const chat = model.startChat({
      history: chatHistory.map((msg) => ({
        role: msg.role,
        parts: msg.text,
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Get streaming response
    const result = await chat.sendMessageStream(structuredPrompt);

    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
    }

    // Cache the response
    cache.set(cacheKey, fullResponse);

    return fullResponse;
  } catch (error: any) {
    // Handle rate limit errors gracefully
    if (
      error.message?.includes("resource_exhausted") ||
      error.message?.includes("rate limit")
    ) {
      throw new Error(
        "We are experiencing high demand. Please try again in a few minutes."
      );
    }
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get response from AI service");
  }
}
