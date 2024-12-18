import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location } from '../../models/Location.ts'
import type { Event, EventData, EventWithLocation } from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

// Step 1
export async function getAllLocations(): Promise<Location[]> {
  const locations = await connection('locations')
  // console.log(locations)
  return locations as Location[]
}

// Step 2
export async function getEventsByDay(day: string) {
  const result = await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where({ day })
  .select(
    'events.id as id',
    'day',
    'time',
    'locations.name as locationName',
    'events.name as eventName',
    'events.description as description',
  )

  return result as EventWithLocation[]
}

// Step 3
export async function getLocationById(id: number) {
  const result = await connection('locations').where('id', id).first()
  // console.log('location by id:', result)

  return result
}

// Step 4
export async function updateLocation(updatedLocation: Location
  // id: number,
  // { name, description }: LocationData,
  // id: string,
  // name: string,
  // description: string,
) {
  await connection('locations')
    .where('locations.id', updatedLocation.id)
    .update({'name': updatedLocation.name, 'description': updatedLocation.description})
  // .returning('*')

  // console.log(id)

  // return result
}


//Step 5
export async function addNewEvent(event: EventData) {
  const newEvent = await connection('events')
    // .where('id', event.location_id)
    // .select('locationId' as 'location_id')
    .insert({
      location_id: event.locationId,
      day: event.day,
      time: event.time,
      name: event.name,
      description: event.description
    })
    .returning('*') // always return an arry from knex

    return newEvent as Event[]
}

// event by id

export async function getEventsById(id: number) {
  const event = await connection('events').where({id}).first()
  return event

}

//TODO
//Step 6
export async function deleteEventById(id: number) {
  await connection('events').where('id', id).delete()
}
