const mongoose = require('mongoose'),
    Task = mongoose.model('Task');
    Student = mongoose.model('Student');
    Class = mongoose.model('Class');

exports.list_all_tasks = function(req,res) {
    Task.find({}, function(err,task){
       if(err)
           res.send(err);
       res.json(task);
    });
};

exports.create_a_task = function(req,res) {
    const new_task = new Task(req.body);
    new_task.save(function(err, task){
        if(err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res){
    Task.findOneAndUpdate(
        {_id: req.params.taskId},
        req.body,
        {new: true},
        function(err, task){
            if(err)
                res.send(err);
            res.json(task);
        });
};

exports.read_a_task = function(req,res){
    Task.findById(req.params.taskId, function(err, task){
       if (err)
           res.send(err);
       res.json(task);
    });
};

exports.delete_a_task = function(req,res){
  Task.remove({_id: req.params.taskId},
      function(err, task){
        if(err)
            res.send(err);
        res.json({message: 'Task succesfully deleted'});
      });
};

exports.get_current_user = function(req,res){
    res.send(req.user);
};

exports.logout = function(req,res){
    req.logout();
    //res.send(req.user);
    res.redirect('/'); //Inside a callback… bulletproof!
};

exports.list_student_classes = function(req, res){   //probably wrong
    Student.findOne({googleId: req.user.googleId}, function(err, student){
        if(err)
            res.send(err);
        res.json(student.classes);
    });
};

exports.list_all_classes = function(req, res){
    Class.find({}, function(err,clas){
        if(err)
            res.send(err);
        res.json(clas);
    });
};

exports.create_a_class = function(req, res){
    const new_class = new Class(req.body);
    new_class.save(function(err, clas){
        if(err)
            res.send(err);
        res.json(clas);
    });
};

exports.read_a_class = function(req, res){
    Class.findById(req.params.classId, function(err, clas){
        if (err)
            res.send(err);
        res.json(clas);
    });
};

exports.add_a_student_class = async function(req, res){

    const existingClass = await Class.findOne({name: req.params.name});
    if(existingClass) {
        Student.findOne({googleId: req.user.googleId}, function(err, student){
            student.classes.push(existingClass);
            student.save(done);
            if(err)
                res.send(err);
            res.json(student);
        });
    } else {
        const clas = await new Class({name:req.params.name}).save();
        Student.findOne({googleId: req.user.googleId}, function(err, student){
            student.classes.push(clas);
            student.save(done);
            if(err)
                res.send(err);
            res.json(student);
        });
    }

};

exports.delete_a_student_class = function(req, res){
};

exports.add_or_remove_dislike = function(req, res){
};

exports.add_or_remove_like = function(req, res){
};


