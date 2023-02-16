const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {products: products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let producto = products.find((producto)=>{
			return producto.id == id;
		})
		if(!producto){
			res.render("error", {message: "Producto no encontrado"})
		} else {
		res.render("detail", {producto: producto, toThousand})
		}
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let producto = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.png",
		}
		products.push(producto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id;
		let producto = products.find((producto)=>{
			return producto.id == id;
		})
		if(!producto){
			res.render("error", {message: "Producto no encontrado"})
		} else {
		res.render("product-edit-form", {producto: producto})
		}
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let producto = products.find((producto)=>{
			return producto.id == id;
		})
		if(!producto){
			res.render("error", {message: "Producto no encontrado"})
		} else {
			producto.name = req.body.name;
			producto.price = req.body.price;
			producto.discount = req.body.discount;
			producto.category = req.body.category;
			producto.description = req.body.description;
			producto.image = req.body.image;
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
			res.redirect("/products");
		}

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id;
		let producto = products.find((producto)=>{
			return producto.id == id;
		})
		if(!producto){
			res.render("error", {message: "Producto no encontrado"})
		} else {
			let productosFiltrados = products.filter((producto)=>{
				return producto.id != id;
			})
			fs.writeFileSync(productsFilePath, JSON.stringify(productosFiltrados, null, ' '));
			res.redirect("/products");
		}
	}
};

module.exports = controller;