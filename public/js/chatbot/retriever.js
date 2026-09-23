import { buildKnowledgeBase } from './knowledgeBase.js';

let kb = null;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "");
}

function tokenize(text) {
  return normalize(text).split(/\s+/).filter(w => w.length > 2);
}

export function retrieveChunks(query, topK = 5) {
  if (!kb) {
    kb = buildKnowledgeBase();
  }

  const queryTokens = tokenize(query);
  
  if (queryTokens.length === 0) {
    // Return some general context if query is empty
    return kb.filter(c => c.type === 'course' || c.type === 'contact').slice(0, topK).map(c => c.text).join('\n---\n');
  }

  const scoredChunks = kb.map(chunk => {
    const chunkTokens = tokenize(chunk.title + " " + chunk.text);
    let score = 0;
    
    queryTokens.forEach(qt => {
      // Basic term frequency + substring match for partial words
      chunkTokens.forEach(ct => {
        if (ct === qt) score += 2;
        else if (ct.includes(qt) || qt.includes(ct)) score += 0.5;
      });
    });

    return { chunk, score };
  });

  // Sort by score descending
  scoredChunks.sort((a, b) => b.score - a.score);

  // Take top K that have at least some relevance, or fallback to general context if 0
  const bestChunks = scoredChunks.slice(0, topK);
  
  return bestChunks.map(c => c.chunk.text).join('\n---\n');
}
