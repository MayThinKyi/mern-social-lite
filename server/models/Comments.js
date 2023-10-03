module.exports=(sequelize,DataTypes)=>{
    const Comments=sequelize.define('Comments',{
        comment:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    Comments.associate=(models)=>{
        Comments.belongsTo(models.Users,{
            onDelete:'cascade'
        })
    }
    return Comments;
}