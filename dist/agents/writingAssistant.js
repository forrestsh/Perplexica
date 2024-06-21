"use strict";
// import { BaseMessage } from '@langchain/core/messages';
// import {
//   ChatPromptTemplate,
//   MessagesPlaceholder,
// } from '@langchain/core/prompts';
// import { RunnableSequence } from '@langchain/core/runnables';
// import { StringOutputParser } from '@langchain/core/output_parsers';
// import type { StreamEvent } from '@langchain/core/tracers/log_stream';
// import eventEmitter from 'events';
// import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
// import type { Embeddings } from '@langchain/core/embeddings';
// import logger from '../utils/logger';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("@langchain/core/output_parsers");
const events_1 = __importDefault(require("events"));
const logger_1 = __importDefault(require("../utils/logger"));
const fs_1 = __importDefault(require("fs"));
const MQAssistantPrompt = `
You are MQ Chatbot. You will be answering the user's questions about motivation quotient in general and understanding their MQ scores. 
Since you are a MQ assistant, you would not perform web searches. If you think you lack information to answer the query, you can ask the user for more information or suggest them to switch to a different focus mode. 
`;
const strParser = new output_parsers_1.StringOutputParser();
const convertMessages = (value, index, array) => {
    var role;
    if (value["role"] === "user")
        role = "human";
    else if (value["role"] === "assistant")
        role = "ai";
    else if (value["role"] === "system")
        role = "system";
    else
        role = "generic";
    return [role, value["content"]];
};
function loadHandbook(file_name) {
    const mq_qa_zh_Hans = JSON.parse(fs_1.default.readFileSync(file_name, 'utf8').toString());
    const hb_messages = mq_qa_zh_Hans.map(convertMessages);
    // console.log(hb_messages);
    return hb_messages;
}
const hb_messages_en = loadHandbook("src/agents/mq_qa_en_US.json");
const handleStream = async (stream, emitter) => {
    for await (const event of stream) {
        if (event.event === 'on_chain_stream' &&
            event.name === 'FinalResponseGenerator') {
            emitter.emit('data', JSON.stringify({ type: 'response', data: event.data.chunk }));
        }
        if (event.event === 'on_chain_end' &&
            event.name === 'FinalResponseGenerator') {
            emitter.emit('end');
        }
    }
};
const createMQAssistantChain = (llm) => {
    return runnables_1.RunnableSequence.from([
        prompts_1.ChatPromptTemplate.fromMessages([
            ['system', MQAssistantPrompt],
            ...hb_messages_en,
            new prompts_1.MessagesPlaceholder('chat_history'),
            ['user', '{query}'],
        ]),
        llm,
        strParser,
    ]).withConfig({
        runName: 'FinalResponseGenerator',
    });
};
const handleMQAssistant = (query, history, llm, embeddings) => {
    const emitter = new events_1.default();
    try {
        const MQChain = createMQAssistantChain(llm);
        const stream = MQChain.streamEvents({
            chat_history: history,
            query: query,
        }, {
            version: 'v1',
        });
        handleStream(stream, emitter);
    }
    catch (err) {
        emitter.emit('error', JSON.stringify({ data: 'An error has occurred please try again later' }));
        logger_1.default.error(`Error in MQ assistant: ${err}`);
    }
    return emitter;
};
exports.default = handleMQAssistant;
