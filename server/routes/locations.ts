import express from 'express'

import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res) => {
  try {
    const locations = await db.getAllLocations()
    // console.log(locations)
    res.json({ locations })
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('getting locations failed', error)
    res.sendStatus(500)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    // TODO: Get the location based on its id and replace this viewData
    // const location = {
    //   id: id,
    //   name: 'TangleStage',
    //   description:
    //     'Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip. Not the biggest stage, but perhaps the most hip.',
    // }
    const location = await db.getLocationById(id)
    res.json(location)
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('getting specific event failed', error)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    // console.log(id)
    // console.log(req.body)

    // TODO: call db.updateLocation with these details
    db.updateLocation({ id, name, description })
    // const updated = await db.updateLocation(id, updatedLocation)
    res.sendStatus(204)

    // res.sendStatus(204)
  } catch (error: unknown) {
    // Something bad has happened!
    console.log('updating location failed', error)
    res.sendStatus(500)
  }
})

// router.post('/'), async (req, res) => {
//   try {
//     const newEvent = req.body
//     const result = await db.addNewEvent(newEvent)
//     res.json({id: result})
//   } catch (error: unknown) {
//     // Something bad has happened!
//     console.log('adding event failed', error)
//     res.sendStatus(500)
//   }
//   }

  


export default router
