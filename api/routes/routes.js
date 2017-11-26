'use strict';
const passport = require('passport');

module.exports = function(app){
    const controller = require('../controllers/controlller');

    //todoList Routes
    app.route('/tasks')
        .get(controller.list_all_tasks)
        .post(controller.create_a_task);

    app.route('tasks/:taskId')
        .get(controller.read_a_task)
        .put(controller.update_a_task)
        .delete(controller.delete_a_task);

    //Oauth
    app.route('/auth/google')
        .get(
            passport.authenticate('google',
            {
                scope: ['profile', 'email']
            })
        );

    app.route('/auth/google/callback')
        .get(passport.authenticate('google'));

    app.route('/api/current_user')
        .get(controller.get_current_user);

    app.route('/api/logout')
        .get(controller.logout);

};