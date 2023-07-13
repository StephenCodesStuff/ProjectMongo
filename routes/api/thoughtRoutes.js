const router = require('express').Router();
const{
    getThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeReaction,
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addThoughtReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

// router.route('/:thoughtId').get(getThoughtById).delete(deleteSingleUser).put(updateSingleUser)
module.exports = router;