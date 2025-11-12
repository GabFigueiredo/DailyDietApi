import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'
import { app } from '../src/app.js'
import request from 'supertest'
import { execSync } from 'child_process'

describe('Example', () => {
    beforeAll(async () => {
        await app.ready();
    })
    
    afterAll(async () => {
        await app.close();
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback -all')
        execSync('npm run knex migrate:latest')
    })
    
    test('This is an example test', async () => {
        const response = await request(app.server)
        .post("/rota")
        .send({
            // Body da requisição
        })
        .expect(201)

        console.log(response)
    })
})
