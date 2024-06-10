const router = require('express').Router()
const User = require('./model')

// GET ALL
router.get('/', async (req, res, next) => {
	try {
		const data = await User.find()
		res.status(200).json(data)
	} catch (err) {
		next(err)
	}
})

// GET BY ID
router.get('/:id', async (req, res, next) => {
	try {
		const data = await User.findById(req.params.id)
		data ?
			res.status(200).json(data) :
			res.status(404).json({message: 'The user with the specified ID does not exist'})
	} catch (err) {
		next(err)
	}
})

// POST NEW
router.post('/', async (req, res, next) => {
	try {
		if (!req.body.name || !req.body.bio) {
			res.status(400).json({message: 'Please provide name and bio for the user'})
		} else {
			const data = await User.insert(req.body)
			res.status(201).json(data)
		}
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		const validId = await User.findById(req.params.id)
		if (!req.body.name || !req.body.bio) {
			res.status(400).json({message: 'Please provide name and bio for the user'})
		}
		if (!validId) {
			res.status(404).json({message: 'The user with the specified ID does not exist'})
		} else {
			const data = await User.update(req.params.id, req.body)
			res.status(200).json(data)
		}
	} catch (err) {
		next(err)
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const data = await User.remove(req.params.id)
		if (!data) {
			res.status(404).json({message: 'The user with the specified ID does not exist'})
		} else {
			res.status(200).json(data)
		}
	} catch (err) {
		next(err)
	}
})

// ERRORS
router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});

module.exports = router
