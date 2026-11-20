import { type GraphState } from "../graph.ts";

export function identifyIntentNode(state: GraphState): GraphState {
    const input = state.messages[state.messages.length - 1].text ?? ""

    const inputLower = input.toLowerCase()

    let command: GraphState["command"] = 'unknown'

    if(inputLower.includes("uppercase") || inputLower.includes("upper case")) {
        command = 'uppercase'
    } else if(inputLower.includes("lowercase") || inputLower.includes("lower case")) {
        command = 'lowercase'
    }

    return {
        ...state,
        command,
        output: input
    }
}