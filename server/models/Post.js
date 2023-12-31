module.exports=(sequelize,DataTypes)=>{
    const Posts=sequelize.define('Posts',{
        title:{
            type:DataTypes.STRING,
            allowNull:false
        },
        text:{
            type:DataTypes.STRING,
            allowNull:false
        },
    })
    Posts.associate=(models)=>{
        Posts.belongsTo(models.Users)
        Posts.hasMany(models.Comments,{
            onDelete:'cascade'
          })
          Posts.hasMany(models.Likes,{
            onDelete:'cascade'
          })
    }
    return Posts;
}