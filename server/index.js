const express=require('express');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors())
const db=require('./models');

//User(Auth) Router
const authRouter=require('./router/Auth');
app.use('/auth',authRouter)
//Post Router
const postRouter=require('./router/Post');
app.use('/posts',postRouter)
//Comment Router
const commentRouter=require('./router/Comment');
app.use('/comments',commentRouter);
//Like Router
const likeRouter=require('./router/Like');
app.use('/likes',likeRouter);
//User Router
const userRouter=require('./router/User');
app.use('/users',userRouter)

db.sequelize.sync().then(() => {
    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  });
