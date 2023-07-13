const Thought = require('../models/thought');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thought = await Thought.find();
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async getThoughtByUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createThought(req, res) {
      try {
        const dbUserData = await Thought.create(req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteSingleUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
    
        console.log(user);
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateSingleUser(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true });
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
    
        console.log(user);
        res.json({ message: 'User successfully updated' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId },
          { $addToSet: {friends: req.params.friendId} },
          { runValidators: true, new: true });
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
    
        console.log(user);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId },
          { $pull: {friends: req.params.friendId} },
          { runValidators: true, new: true });
        if (!user) {
          return res.status(404).json({ message: 'No user found with this id' });
        }
    
        console.log(user);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };