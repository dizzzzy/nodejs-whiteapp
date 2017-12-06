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
  const existingClass = await Class.findOne({name: req.body.name});
    if(existingClass) {
        Student.findOne({googleId: req.user.googleId}, function(err, student){
            student.classes.push({id:existingClass._id,name:existingClass.name});
            student.save();
            if(err)
                res.send(err);
            res.json(student);
        });
    } else {
        const clas = await new Class({name:req.body.name}).save();
        console.log('clas', clas);
        Student.findOne({googleId: req.user.googleId}, function(err, student){
            student.classes.push({id:clas._id,name:clas.name});
            student.save();
            if(err)
                res.send(err);
            res.json(student);
        });
    }

};

exports.delete_a_student_class = function(req, res){
};

exports.add_or_remove_like = function(req, res){
    //requires videoID, classId
    //check class of student and see if videoID is in the likedList
        //if yes then remove it
        //if no then add it
  Student.findOne({googleId: req.user.googleId}, function(err, student){
    if(err)
      res.send(err);
    //at this point I have student, i want to find the class with the class_id
    console.log('student.classes', student.classes);
    console.log('req.body.classId',req.body.classId);
    console.log('req.body.videoId',req.body.videoId);
    if(!(req.body.videoId && req.body.classId)){
      res.status(500);
    }
    const class_index = student.classes.map(function(e) {
      return e.id.toString();
    }).indexOf(req.body.classId);
    console.log('class_index',class_index);


    if(class_index !== -1){
      let status;

      if(student.classes[class_index].hasOwnProperty("likeList")){
        console.log('has a property likelist');
          //check if video is in list
        const video_index = student.classes[class_index].likeList.map(function(e) { return e.videoId.toString() }).indexOf(req.body.videoId);
        if(video_index === -1){
            //video does not exist in the students list, add it to the list
          console.log('video_index was not found');
          student.classes[class_index]['likeList'].push({videoId:req.body.videoId});
          status = 'DNE';
        }else{
            //video exists in the list, remove it from the list
          student.classes[class_index]['likeList'].splice(video_index,1);
          status = 'FOUND';
        }
      }else{//does not have a property likeList
        student.classes[class_index]['likeList']=[{videoId:req.body.videoId}];
        status = 'NOPROP';
      }
      student.markModified('classes');
      student.save();
      Class.findById(req.body.classId, function(err, clas){
        if (err)
          res.send(err);
        let class_video_index = clas.videoList.map(function(e) { return e.videoId.toString() }).indexOf(req.body.videoId);
        switch(status){
          case 'DNE':
            //check if video is already in videoList
            //if yes then increment likes
            //if no then make video and set likes to 1
            if(class_video_index === -1) //video was not found in list
            {
              clas.videoList.push({videoId: req.body.videoId, numberLikes:1 });
            }else{//video was found in list
              clas.videoList[class_video_index].numberLikes += 1;
            }
            break;
          case 'FOUND':
            if(class_video_index === -1) //video was not found in list
            {
              //shouldn't happen throw error
              res.status(500);
            }else{//video was found in list
              clas.videoList[class_video_index].numberLikes -= 1;
            }
            break;
          case 'NOPROP':
            if(class_video_index === -1) //video was not found in list
            {
              clas.videoList.push({videoId: req.body.videoId, numberLikes:1 });
            }else{//video was found in list
              clas.videoList[class_video_index].numberLikes += 1;
            }
            break;
          default:
            res.status(500);
        }
        clas.markModified('videoList');
        clas.save();
      });

      res.json(student.classes);
    }else{
      res.status(500);
    }
  });

};

exports.read_class_likes = function(req, res){
  Class.findById(req.params.classId, function(err, clas){
    if (err)
      res.send(err);
    res.json(clas);
  });
};
