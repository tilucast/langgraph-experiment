import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from '../src/server.ts'



test('command upper transforms strings to UPPERCASE', async () => {
    
    const app = createServer()
    const msg = 'transform this string to UPPERCASE'
    const expected = msg.toUpperCase()

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question: msg }
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)
})

test('command lower transforms strings to lowercase', async () => {
    
    const app = createServer()
    const msg = 'transform this string to lowercase'
    const expected = msg.toLowerCase()

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question: msg }
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)
})

test('command lower transforms strings to UNKNOWN', async () => {
    
    const app = createServer()
    const msg = 'HEY There bucko'
    const expected = "Unknown command. Please try again."

    const response = await app.inject({
        method: 'POST',
        url: '/chat',
        body:{ question: msg }
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.body, expected)
})