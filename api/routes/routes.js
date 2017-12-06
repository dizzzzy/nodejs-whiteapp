'use strict';
const passport = require('passport');

module.exports = function(app){
    const controller = require('../controllers/controller');

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
        .get(passport.authenticate('google'), function(req, res){
            res.redirect("/classes")
        });

    app.route('/api/current_user')
        .get(controller.get_current_user);

    app.route('/api/logout')
        .get(controller.logout);

    app.route('/api/classes') //get all classes
        .get(controller.list_all_classes)   //DONE
        .post(controller.create_a_class);  //DONE

    app.route('/api/class/:classId')
        .get(controller.read_a_class); //DONE

    app.route('/api/student/classes')
        .get(controller.list_student_classes) //DONE
        .post(controller.add_a_student_class); //DONE

    app.route('/api/student/classes/:classId')
        .delete(controller.delete_a_student_class); //NEEDS TO BE IMPLEMENTED

    app.route('/api/student/class/like')
        .post(controller.add_or_remove_like);   //This function should update class video list
                                                //Requires (videoId, classId)

   // app.route('api/student/documents') //Student can see the documents he put has
    // added GOOGLE CLOUD STORAGE MAYBE




};