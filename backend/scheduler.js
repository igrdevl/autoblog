import cron from "node-cron";
import { aiClientService } from "./src/services/aiClient.js";
import { saveArticle } from './src/services/articleJob.js';

console.log("Setting cron schedules...");

cron.schedule("*/1 * * * *", async () => {
    try {
        const title = await aiClientService.generateTopic();
        console.log("Titulo gerado:", title);

        const article = await aiClientService.generateArticle(title);
        console.log("Artigo gerado:", article);

        await saveArticle(title, article);  
    } catch (err) {
        console.error("Erro ao gerar artigo:", err);
    }
});

