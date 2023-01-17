const mongoose = require('mongoose');

// Conectarse a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true});

// Verificar si la conexión fue exitosa
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
    
/* Crear una nueva colección de productos
    mongoose.connection.db.createCollection("products", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
    });*/
}); 

// Crear el esquema del modelo de producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, require: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

// Crear el modelo de producto a partir del esquema
const Product = mongoose.model('Product', productSchema);

/* Array de productos a crear
const productsToCreate = [
    { name: 'Lampara', description: 'lamparita', price: 120, stock: 10 },
    { name: 'Anteojos', description: 'anteojos de sol', price: 2500, stock: 10 },
    { name: 'Celular', description: 'celular de 12mpx', price: 5000, stock: 60 },
    { name: 'Campera', description: 'color negra', price: 4900, stock: 70 },
    { name: 'Buzo', description: 'algodon', price: 3680, stock: 23 },
    { name: 'Remera', description: 'algodon', price: 2000, stock: 45 },
    { name: 'Gorras', description: 'sin estampados', price: 900, stock: 12 },
    { name: 'Fundas', description: 'rojas', price: 1500, stock: 76 },
    { name: 'Bufandas', description: 'lana', price: 2500, stock: 44 },
    { name: 'Zapatillas', description: 'urbanas', price: 5000, stock: 35 },
]; 

// Escribir varios productos en la base de datos
Product.create(productsToCreate, function(err, products) {
    if (err) return console.error(err);
    console.log("Products created: ", products);
}); */



// N° 3 -- Listar todos los documentos
// db.products.find();


// --------- CRUD ------- // 


// Crear un producto mas a la coleccion.
// A)
const newProduct = new Product({ name: 'Lapicera', description: 'roja', price: 550, stock: 69 },);

// Guardar el producto en la base de datos
newProduct.save(function(err, product) {
    if (err) return console.error(err);
    console.log("Product saved: ", product);
}); 

// B)
// Realizar una consulta por nombre específico
Product.find({ name: "Lapicera" }, function(err, products) {
    if (err) return console.error(err);
    console.log("Products found: ", products);
}); 

// 1
// Realizar una consulta por precio menor a 1000
Product.find({ price: { $lt: 1000 } }, function(err, products) {
    if (err) return console.error(err);
    console.log("Products found: ", products);
}); 

// 2
// Realizar una consulta por precio entre 1000 y 3000
Product.find({ price: { $gte: 1000, $lte: 3000 } }, function(err, products) {
    if (err) return console.error(err);
    console.log("Products found: ", products);
}); 

// 3
// Realizar una consulta por precio mayor a 3000
Product.find({ price: { $gt: 3000 } }, function(err, products) {
    if (err) return console.error(err);
    console.log("Products found: ", products);
}); 

// 4
// Realizar una consulta por el nombre del tercer producto más barato
Product.find({}, { name: 1 }).sort({ price: 1 }).limit(1).skip(2).exec(function(err, products) {
    if (err) return console.error(err);
    console.log("Name of the third cheapest product: ", products[0].name);
}); 

//C
// Realizar una actualización en todos los productos agregando el stock a 100
Product.updateMany({}, { $set: { stock: 100 } }, function(err, result) {
    if (err) return console.error(err);
    console.log("Number of products updated: ", result.n);
}); 

//D
// Realizar una actualización en los productos con precios mayores a 4000, cambiando el stock a 0
Product.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } }, function(err, result) {
    if (err) return console.error(err);
    console.log("Number of products updated: ", result.n);
});

//E 
// Realizar una eliminación en los productos con precios menores a 1000
Product.deleteMany({ price: { $lt: 1000 } }, function(err, result) {
    if (err) return console.error(err);
    console.log("Number of products deleted: ", result.deletedCount);
});  

/* // Crear un usuario que solo pueda leer: 
use ecommerce
db.createUser({ user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" }] }) 

// Verificar que no pueda cambiar la info.
// db.getUser("pepe") */