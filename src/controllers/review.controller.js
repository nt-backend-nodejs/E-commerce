import {
    createReviewService,
    deleteReviewByIdService,
    getReviewByIdService,
    getReviewsService,
    updateReviewByIdService,
} from '../services/index.js'

export const createReview = async (req, res, next) => {
    try {
        const result = await createReviewService(req.body)
        const { error, success, review } = result
        if (success) {
            return res.status(201).send({ message: 'Created', review })
        } else {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        next(error)
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const result = await getReviewsService()
        const { error, success, review } = result
        if (success) {
            return res.status(201).send({ message: 'success', review })
        } else {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        next(error)
    }
}
export const getReviewById = async (req, res, next) => {
    try {
        const result = await getReviewByIdService(req.params.id)
        const { error, success, review } = result
        if (success) {
            return res.status(201).send({ message: 'success', review })
        } else {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        next(error)
    }
}

export const deleteReviewById = async (req, res, next) => {
    try {
        const result = await deleteReviewByIdService(req.params.id)
        const { error, success, review } = result
        if (success) {
            return res.status(201).send({ message: 'deleted', review })
        } else {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        next(error)
    }
}

export const updateReviewById = async (req, res, next) => {
    try {
        const result = await updateReviewByIdService(req.params.id, req.body)
        const { error, success, review } = result
        if (success) {
            return res.status(201).send({ message: 'updated', review })
        } else {
            return res.status(404).send(error.message)
        }
    } catch (error) {
        next(error)
    }
}
