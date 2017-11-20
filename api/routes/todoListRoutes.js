'use strict';
const passport = require('passport');

module.exports = function(app){
    const todoList = require('../controllers/todoListControlller');

    //todoList Routes
    app.route('/tasks')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('tasks/:taskId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);

    //Oauth
    app.route('/auth/google')
        .get(
            passport.authenticate('google',
            {
                scope: ['profile', 'email']
            })
        );

    app.route('/auth/google/callback')
        .get(
          passport.authenticate('google')
        );

};