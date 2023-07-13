const {Thought, User} = require('../models');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thought = await Thought.find();
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async getThoughtById(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
          {_id:req.body.userId},
          {$addToSet: {thoughts: thought._id}},
          {new: true}
        ) 
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Video created but no user with this id!' });
        }
  
        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async addThoughtReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $push: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };