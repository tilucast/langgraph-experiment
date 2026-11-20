import { AIMessage, SystemMessage } from "langchain";
import { type GraphState } from "../graph.ts";

export function fallbackNode(state: GraphState): GraphState {
    const message = "Unknown command. Please try again."
    const fallbackMessage = new AIMessage(message).content.toString()

    return {
        ...state,
       output: fallbackMessage,
       messages: [
        ...state.messages, 
        new SystemMessage("Fallback node executed. No valid command found."),
    ]
    }
}