import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import request from 'supertest'

import { connection } from '../db/index.ts'
import server from '../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('Deleting an Event', () => {
  it('can be deleted', async () => {
    // TODO: write server integration test for event delete
    // Arrange - inputs and expected outputs
    const eventIdToDelete = await request(server).get('/api/v1/events/1')
    expect(eventIdToDelete.status).toBe(200)
    // Act - target behaviour
    const res = await request(server).delete(`/api/v1/events/1`)
    const events = await connection('events').select()
    // Assert - expected outcome
    expect(res.status).toBe(204)
    expect(events).toHaveLength(4)
    console.log(events)
  })
})
