async function generateTopic() {
    let prompt = `Generate only a three words topic for an article, you should not explain anything, just give me the words.`; 
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
        model: 'tngtech/deepseek-r1t2-chimera:free',
        messages: [
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,      
        })
    });
    const data = await resp.json();
    return data.choices[0].message.content;
}

async function generateArticle(topic) {
    let prompt = `Write a detailed article about ${topic}, don't give a title, just the article content.`; 
    const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
        },
        body: JSON.stringify({
        model: 'tngtech/deepseek-r1t2-chimera:free',
        messages: [
            { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        min_tokens: 1500,
        max_tokens: 3000,      
        })
    });
    const data = await resp.json();
    return data.choices[0].message.content;
}

export const aiClientService = {
    generateTopic,
    generateArticle
};
