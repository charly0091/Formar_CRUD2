const { render } = require('ejs');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visitados = products.filter((producto) => {
			return producto.category == "visited";
		})
		let ofertas = products.filter((producto) => {
			return producto.category == "in-sale";
		})
		
		res.render('index', { visitados: visitados, ofertas: ofertas, toThousand });
	},
	search: (req, res) => {
		let busqueda = req.query.keywords;
		let productos = products.filter((producto) => {
			return producto.name.toLowerCase().includes(busqueda.toLowerCase());
		})
		res.render('results', { productos: productos, toThousand });
	},
};

module.exports = controller;
