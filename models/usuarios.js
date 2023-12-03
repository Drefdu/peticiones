const {Schema, model} = require ('mongoose')
const bcrypt = require('bcryptjs');
const UsuarioSchema=Schema({
    
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true, 'El correo es obligatorio'],
        unique:true //para que no haya iguales
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROL']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
})

UsuarioSchema.pre('save', function (next) {
    const user = this;
  
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
  
        
        user.password = hash;
        next();
      });
    });
});

module.exports=model('Usuario',UsuarioSchema)