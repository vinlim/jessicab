import OpenAI from "openai";

const client = new OpenAI({
    apiKey: 'sk-RHyELleFSbQw11siVC2ZSRmQMIe64YLyAHadePF7_0T3BlbkFJzMpwz5CpNmPk2RTrD_4u140U4m_YqXtVM68DCuufIA'
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