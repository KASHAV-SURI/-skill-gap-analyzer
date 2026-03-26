/**
 * openrouterClient.js
 * Generates quiz questions using the OpenRouter AI API.
 * Uses google/gemma-3-12b-it:free model (no cost on free tier).
 */

const parseQuestionsFromContent = (content) => {
  // Try direct JSON parse first
  try {
    const parsed = JSON.parse(content.trim());
    if (Array.isArray(parsed)) return parsed;
    if (parsed.questions && Array.isArray(parsed.questions)) return parsed.questions;
  } catch {}

  // Extract JSON array from mixed content (handles text before/after)
  const arrayMatch = content.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]);
    } catch {}
  }

  // Extract from markdown code block
  const codeMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeMatch) {
    try {
      const parsed = JSON.parse(codeMatch[1].trim());
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }

  throw new Error("Could not parse AI response as a question array");
};

const validateAndNormalize = (raw, difficulty, fallbackTopic) => {
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new Error("AI returned no questions");
  }

  return raw
    .filter((q) => q && (q.question || q.text) && Array.isArray(q.options) && q.options.length >= 2)
    .map((q) => {
      const options = q.options.slice(0, 4);
      while (options.length < 4) options.push(`Option ${options.length + 1}`);

      const answer =
        typeof q.answer === "number" && q.answer >= 0 && q.answer <= 3 ? q.answer : 0;

      return {
        question: (q.question || q.text).trim(),
        options,
        answer,
        topic: q.topic || fallbackTopic,
        difficulty,
      };
    });
};

const generateAIQuestions = async (roleName, topics, difficulty, count = 10) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const topicNames = (topics || [])
    .map((t) => (typeof t === "string" ? t : t.name))
    .filter(Boolean)
    .slice(0, 8)
    .join(", ");

  const difficultyGuide =
    difficulty === "easy"
      ? "basic/foundational concepts, definitions, simple usage"
      : difficulty === "medium"
      ? "practical application, common patterns, understanding of how things work"
      : "advanced concepts, edge cases, performance, best practices, trade-offs";

  const prompt = `You are a senior technical interviewer. Generate exactly ${count} multiple-choice quiz questions to assess a "${roleName}" candidate at ${difficulty} difficulty level.

Topics to cover (spread questions across all of these): ${topicNames}

Difficulty guidelines for ${difficulty}: ${difficultyGuide}

Return ONLY a valid JSON array — no markdown, no explanation, just the raw JSON:
[
  {
    "question": "clear, specific technical question",
    "options": ["option A text", "option B text", "option C text", "option D text"],
    "answer": 0,
    "topic": "exact topic name from the list above",
    "difficulty": "${difficulty}"
  }
]

Rules:
- "answer" is the integer index (0–3) of the correct option
- Exactly 4 options per question, with only ONE correct answer
- Wrong options must be plausible (no obviously silly distractors)
- Return exactly ${count} questions`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.CLIENT_ORIGIN || "https://skillgap.app",
      "X-Title": "SkillGap Analyzer",
    },
    body: JSON.stringify({
      model: "google/gemma-3n-e4b-it:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from AI model");
  }

  const raw = parseQuestionsFromContent(content);
  const validated = validateAndNormalize(
    raw,
    difficulty,
    topics?.[0]?.name || topics?.[0] || "General"
  );

  if (validated.length < 5) {
    throw new Error(
      `AI only generated ${validated.length} valid questions (expected at least 5). Try again.`
    );
  }

  return validated.slice(0, count);
};

module.exports = { generateAIQuestions };
