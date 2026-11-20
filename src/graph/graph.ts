import {END, MessagesZodMeta, START, StateGraph} from '@langchain/langgraph'
import { withLangGraph } from '@langchain/langgraph/zod'
import { BaseMessage } from 'langchain'
import {z} from 'zod/v3'
import { identifyIntentNode } from './nodes/identifyIntentNode.ts'
import { chatResponseNode } from './nodes/chatResponseNode.ts'
import { uppercaseNode } from './nodes/uppercaseNode.ts'
import { lowercaseNode } from './nodes/lowercaseNode.ts'
import { fallbackNode } from './nodes/fallbackNode.ts'

const graphState =  z.object({
    messages: withLangGraph(
        z.custom<BaseMessage[]>(),
        MessagesZodMeta
    ),
    output: z.string(),
    command: z.enum(['uppercase', 'lowercase', 'unknown'])
})

export type GraphState = z.infer<typeof graphState>

export function buildGraph(){
    const workflow = new StateGraph({
        state: graphState
    })

    // .addNode("identifyIntent", (state: GraphState) => {

    //     return {
    //         ...state,
    //         output: `testing`,
    //     }
    // })

    .addNode("identifyIntent", identifyIntentNode)
    .addNode("chatResponse", chatResponseNode)

    .addNode("uppercase", uppercaseNode)
    .addNode("lowercase", lowercaseNode)
    .addNode("fallback", fallbackNode)

    .addEdge(START, "identifyIntent")
    .addConditionalEdges("identifyIntent",
        (state: GraphState) => {
            switch(state.command) {
                case "uppercase":
                    return "uppercase"
                case "lowercase":
                    return "lowercase"
                default:
                    return "fallback"
            }
        },
        {
            'uppercase': "uppercase",
            'lowercase': "lowercase",
            'fallback': "fallback"
        }
    )
    .addEdge("uppercase", "chatResponse")
    .addEdge("lowercase", "chatResponse")
    .addEdge("fallback", "chatResponse")
    .addEdge("chatResponse", END)

    return workflow.compile()
}