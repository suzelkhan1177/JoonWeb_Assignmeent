const express = require("express");
const router = express.Router();
const db = require('../config/mysql');

//               All Blog Routers

router.delete('/api/blogs/:blogId', (req, res) => {
  const blogId = req.params.blogId;
  const deleteQuery = 'DELETE FROM Blog WHERE blogid = ?';

  db.query(deleteQuery, [blogId], (error, results) => {
    if (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ error: 'An error occurred while deleting the blog.' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Blog not found Invalid BlogId.' });
    } else {
      res.json({ message: 'Blog deleted successfully.' });
    }
  });
});


// All user Blogs
router.get('/api/blogs', (req, res) => {
  // Retrieve all blogs from the database
  db.query('SELECT * FROM Blog', (error, results) => {
    if (error) {
      console.error('Error retrieving blogs:', error);
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    } else {
      res.json(results);
    }
  });
});



// Update Blogs
router.put('/api/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { blogtitle, blogcontent } = req.body;

  // Create the updated blog object
  const updatedBlog = {
    blogtitle,
    blogcontent,
    blogmodified: new Date()
  };

  // Update the blog in the database
  db.query('UPDATE Blog SET ? WHERE blogid = ?', [updatedBlog, blogId], (error) => {
    if (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ error: 'Failed to update blog' });
    } else {
      res.json(updatedBlog);
    }
  });
});




// Get  all Blogs single User
router.get('/api/users/:id/blogs', (req, res) => {
  const userId = req.params.id;

  // Retrieve blogs from the database for the specified user
  db.query('SELECT * FROM Blog WHERE userId = ?', userId, (error, results) => {
    if (error) {
      console.error('Error retrieving blogs:', error);
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    } else {
      res.json(results);
    }
  });
});


// Create Blog
router.post('/api/blogs', (req, res) => {
  const { blogtitle, blogcontent, userId } = req.body;

  // Create the blog object
  const newBlog = {
    blogtitle,
    blogcontent,
    blogcreated: new Date(),
    blogmodified: new Date(),
    userId
  };

  // Insert the blog into the database
  db.query('INSERT INTO Blog SET ?', newBlog, (error, results) => {
    if (error) {
      console.error('Error creating blog:', error);
      res.status(500).json({ error: 'Failed to create blog' });
    } else {
      const createdBlog = { ...newBlog, blogid: results.insertId };
      res.status(201).json(createdBlog);
    }
  });
});






//                  All  User Routers 

//Delete user
router.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;

  // Delete the user from the User table
  const deleteUserQuery = 'DELETE FROM User WHERE id = ?';
  db.query(deleteUserQuery, [userId], (err, result) => {
    if (err) {
      // Handle any errors
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'User Not Present Invalid UserId.' });
    } else {
      // User deleted successfully
      res.json({ message: 'User deleted successfully' });
    }
  });
});



// Update user details
router.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, profilepic } = req.body;

  // Generate a unique slug for the updated user
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // Create the updated user object
  const updatedUser = {
    name,
    profilepic,
    slug,
    modified: new Date()
  };

  // Update the user in the database
  db.query('UPDATE User SET ? WHERE id = ?', [updatedUser, userId], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    } else {
      res.json(updatedUser);
    }
  });
});



// Create new User
router.post('/api/users', (req, res) => {
  const { name, profilepic } = req.body;

  // Generate a unique slug for the user
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  // Create the user object
  const user = {
    name,
    profilepic,
    slug,
    created: new Date(),
    modified: new Date()
  };

  // Insert the user into the database
  db.query('INSERT INTO User SET ?', user, (error, results) => {
    if (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      const createdUser = { ...user, id: results.insertId };
      res.status(201).json(createdUser);
    }
  });
});




// get All User
router.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM User';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Suzel  API Assignment !</h1>');
});




module.exports = router;
