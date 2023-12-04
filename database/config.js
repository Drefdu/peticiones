const mongoose = require ('mongoose')
const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://daniela:danielaruiz@cluster1.8zhrttp.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('Base de datos online :)')
    } catch (error) {
        console.log(error)  
        throw new Error('Error al iniciar la base de datos')
    }
}

module.exports = {
    dbConnection
}