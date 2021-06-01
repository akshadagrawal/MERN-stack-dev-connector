const express= require('express');
const router= express.Router();
const mongoose =require('mongoose');
const passport= require('passport');
const Post= require('../../models/Posts');
const Profile = require('../../models/Profile');

//Load validations
const validatePostInput= require('../../validations/post');

//@route    GET api/posts
//@desc     GET posts
//Access    Public

router.get('/', (req,res)=>{

    const errors={};
    Post.find()
        .sort({date: -1})
        .then(posts=> {
            if(posts)
                return res.json(posts);
            else {
                errors.nopost= 'No posts available!';
                return res.status(404).json(errors);
            }
        })
        .catch(err=> console.log(err));
});

//@route    GET api/posts/:id
//@desc     GET post by id
//Access    Public    


router.get('/:id', (req,res)=>{

    const errors={};
    Post.findById(req.params.id)
        .then(post=> {
            if(!post){
                errors.nopost= 'No post found';
                return res.status(404).json(errors);
            }    
            else {
                return res.json(post);
            }
        })
        .catch(err=> console.log(err));
})



//@route    POST api/posts
//@desc     Create Post
//Access    Private

router.post('/',passport.authenticate('jwt', {session: false}),(req,res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost=new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post=> res.json(post));

});

//@route    Delete api/posts/:id
//@desc     Delete post by id
//Access    Private

router.delete('/:id', passport.authenticate('jwt', {session: false}),(req,res)=>{

    const errors={};

    //Check if user has not 
   Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
            .then(post =>{
                if(!post){
                    errors.nopost= 'Post not found';
                    return res.status(400).json(errors);
                }
                //Check for owner
                if(post.user.toString() !== req.user.id){
                    errors.notauthorized='User not authorized';
                    return res.status(401).json(errors);
                }
                else{
                    post.remove().then(()=> res.json({success: true}));
                }
            })
            .catch(err=> console.log(err));
    })
})

//@route   post api/posts/like/:id
//@desc    like a post
//Access    Private

router.post('/like/:id', passport.authenticate('jwt', {session: false}),(req,res)=>{

    const errors={};

   //Check if user has not 
   Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
            .then(post =>{
                if(post.likes.filter(like=> like.user.toString() === req.user.id).length >0 ){
                    return res.status(400).json({alreadyliked: "User already liked the post"});
                }

                //Add user id to likes array
                post.likes.unshift({ user: req.user.id});
                post.save()
                    .then(post=> res.json(post));
            })
            .catch(err=> console.log(err)); 
    })
})

//@route   post api/posts/unlike/:id
//@desc    unlike a post
//Access    Private

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}),(req,res)=>{

    const errors={};

   //Check if user has not 
   Profile.findOne({user: req.user.id})
    .then(profile=>{
        Post.findById(req.params.id)
            .then(post =>{
                if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0 ){
                    return res.status(400).json({notliked: "You have not liked the post"});
                }

                //Get remove index
                const removeIndex = post.likes
                    .map(item=> item.user.toString())
                    .indexOf(req.user.id);

                //Splice 
                post.likes.splice(removeIndex,1);

                //Save
                post.save()
                    .then(post=> res.json(post));
            })
            .catch(err=> console.log(err)); 
    })
})


//@route   post api/posts/comment/:id
//@desc    Add comment to a post
//Access    Private

router.post('/comment/:id', passport.authenticate('jwt', {session: false}),(req,res)=>{

    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

   //Check if user has not 
        Post.findById(req.params.id)
            .then(post =>{
               const newComment= {
                   text: req.body.text,
                   name: req.body.name,
                   avatar: req.body.avatar,
                   user: req.user.id
               }

               //Add to comments array
               post.comments.unshift(newComment);

               //save
               post.save()
                .then(post=> res.json(post));
            })
            .catch(err=> console.log(err)); 
    })

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    delete comment from a post
//Access    Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}),(req,res)=>{

   //Check if user has not 
        Post.findById(req.params.id)
            .then(post =>{

               //check if comment exists
               if(post.comments.filter(comment=>comment._id.toString()  === req.params.comment_id).length===0){
                   return res.status(404).json({commentnotexists: "Comment does not exists"});
               }

               //Get remove index
               const removeIndex = post.comments
                .map(item=> item._id.toString())
                .indexOf(req.params.comment_id);

               //splice comment out of array
               post.comments.splice(removeIndex,1);

               //save
               post.save()
               .then(post=> res.json(post));

            })
            .catch(err=> console.log(err)); 
    })


module.exports= router;