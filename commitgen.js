import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFilePath = path.resolve(__dirname, '.', '.env');
dotenv.config({ path: envFilePath });

const client = new OpenAIClient(
  process.env.AOAI_ENDPOINT, 
  new AzureKeyCredential(process.env.AOAI_API_KEY)
);

const system_prompt = "あなたはGit Commit コメント生成マシンです。入力されたdiff形式の差分コードに対して、72文字以内のサマリーコミットコメントを生成して下さい。可能な限り短い日本語の文章にして下さい。"
let arg2 = process.argv[2];
if(!arg2) arg2 = "";
const user_prompt = arg2;

const messages = [
  {role: "system", content: system_prompt},
  {role: "user", content: user_prompt}
]
const { id, created, choices, usage } = await client.getChatCompletions(process.env.AOAI_MODEL, messages);

console.log(choices[0].message.content);
