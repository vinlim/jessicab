import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPEN_AI_API
});


const tools = [{
    type: "function",
    name: "check_engineering_ticket_status",
    description: "Get the status of an engineering ticket and its entire content",
    parameters: {
        type: "object",
        properties: {
            ticketName: { type: "string" },
            ticketStatus: { type: "string" }
        },
        required: ["ticketName", "ticketStatus"],
        additionalProperties: false,
    },
    strict: true
}];

const response = await client.responses.create({
    model: "gpt-4.1",
    input: "how far is earth to moon?",
    tools: tools
});

if(response.output) {
    if(response.output[0].type === 'function_call') {
        console.log(response.output[0].name, response.output[0].arguments)
    } else {
        console.log(response.output[0].content[0].text)
    }
}