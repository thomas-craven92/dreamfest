// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'

import { setupApp } from './setup.tsx'

beforeAll(() => {
  nock.disableNetConnect()
})

const fakeEvent = {
  id: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Slushie Apocalypse I',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
  locationId: 1,
}

const fakeLocations = {
  locations: [
    {
      id: 1,
      name: 'Kayak Room',
      description: 'This is the room we keep kayaks in',
    },
  ],
}

describe('Deleting an event', () => {
  it('shows current data on the form', async () => {
    const eventScope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, fakeEvent)

    const locationScope = nock('http://localhost')
      .get('/api/v1/locations')
      .reply(200, fakeLocations)

    // ARRANGE
    const { ...screen } = setupApp('/events/1/edit')
    // ACT
    // ASSERT
    const nameInput = await screen.findByLabelText('Event name')
    const descriptionInput = await screen.findByLabelText('Description')

    expect(nameInput).toBeVisible()
    expect(nameInput).toHaveValue('Slushie Apocalypse I')
    expect(descriptionInput).toBeInTheDocument()
    expect(descriptionInput).toHaveValue(
      'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
    )

    expect(eventScope.isDone()).toBe(true)
    expect(locationScope.isDone()).toBe(true)
  })

  it('deletes the event when the delete button is clicked', async () => {
    // TODO: write client integration test for event delete
    // ARRANGE
    const scope = nock('http://localhost')
    .get('/api/v1/events/1')
    .reply(200, fakeEvent)

    const deleteScope = nock('http://localhost')
    .delete('/api/v1/events/1')
    .reply(204)
    
    // const updatedListScope = nock('http://localhost')
    // .get('/schedule/friday')
    // .reply(200, 
    //   [
    //     {
    //       id: 2,
    //       location_id: 2,
    //       day: 'friday',
    //       time: '6pm - 7pm',
    //       name: 'LEGO Builder Championships',
    //       description:
    //         'This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!',
    //     }
    //   ]
    // )
    // .persist() // to continually intercept the req
    // ACT
    const {user, ...screen} = setupApp('/events/1/edit') // is setupApp our renderRoute?

    const deleteButton = await screen.findByRole('button', {name: 'Delete event'})
    await user.click(deleteButton)

    // ASSERT
    // const deleteButton = await screen.findAllByLabelText('delete')
    // expect(remainingEvents).toHaveLength(1)
    // deleteButton[0].click()
  
    expect(scope.isDone()).toBe(true)
    expect(deleteScope.isDone()).toBe(true)
    // expect(updatedListScope.isDone()).toBe(true)
})
})

