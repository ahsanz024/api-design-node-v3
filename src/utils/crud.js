export const getOne = model => async (req, res) => {
  // params are query params + dynamic part of the url
  // e.g. `/item/:id` as mentioned in the routes
  try {
    const obj = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec()

    if (!obj) {
      return res.status(404).end()
    }

    res.status(200).json({
      data: obj
    })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const doc = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(404).end()
    }

    res.status(200).json({
      data: doc
    })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const createOne = model => async (req, res) => {
  try {
    const doc = await model.create({ ...req.body, createdBy: req.user._id })
    if (!doc) {
      res.status(500).end()
    }

    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()
    if (!updatedDoc) {
      return res.status(400).end()
    }
    res.status(200).json({ data: updatedDoc })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const doc = await model.findOneAndRemove({
      _id: req.params.id,
      createdBy: req.user._id
    })

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
