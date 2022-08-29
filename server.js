const express = require('express');
const path = require('path');
const server = express();
const Port = 4000;

// this allow our server to read raw form data
server.use(express.json());

// this allow our server to read urlencoded forms
server.use(express.urlencoded({ extended: true }));

let products = [
	{
		id: 1,
		name: 'Palm Wine',
		qantitity: 10,
		price: 200,
		imageURL:
			'https://cdn.pixabay.com/photo/2021/05/05/11/02/water-lilies-6230802__340.jpg',
	},
	{
		id: 2,
		name: 'Red Wine',
		qantitity: 15,
		price: 100,
		imageURL:
			'https://cdn.pixabay.com/photo/2022/02/18/07/27/lake-7020123__340.jpg',
	},
	{
		id: 3,
		name: 'Green Wine',
		qantitity: 20,
		price: 500,
		imageURL:
			'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944__340.jpg',
	},
	{
		id: 4,
		name: 'yellow Wine',
		qantitity: 70,
		price: 5000,
		imageURL:
			'https://cdn.pixabay.com/photo/2022/07/26/12/43/mountains-7345777__340.jpg',
	},
];

let users = [
	{
		id: 1,
		email: 'boyepanthera@gmail.com',
		firstName: 'Olanrewaju',
		lastName: 'Olaboye',
		password: '1234567',
	},
	{
		id: 2,
		email: 'jamal@gmail.com',
		firstName: 'Olajide',
		lastName: 'Ibrahim',
		password: '1234567',
	},
	{
		id: 3,
		email: 'dayolonge@gmail.com',
		firstName: 'Oladayo',
		lastName: 'Longe',
		password: '1234567',
	},
];

server.get('/', (req, res) => {
	// console.log(req);
	res.send('hello');
});

server.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/login.html'));
});

server.post('/api/login', (req, res) => {
	// console.log('reqest body', req.body);

	const userExist = users.find((user) => user.email === req.body.email);

	if (userExist) {
		if (userExist.password === req.body.password) {
			return res.send({ user: userExist });
		} else {
			return res.status(400).send('wrong values provided');
		}
	} else {
		return res.status(400).send({ message: 'wrong info sent' });
	}
});

server.get('/product', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/product.html'));
});

server.get('/product/:id', (req, res) => {
	// console.log(req.params);
	res.sendFile(path.join(__dirname, '/views/single-product.html'));
});

server.get('/api/product', (req, res) => {
	res.send({ products });
});

server.get('/api/product/:id', (req, res) => {
	const productExist = products.find(
		(product) => product.id === Number(req.params.id)
	);

	if (productExist) {
		return res.status(200).send({ product: productExist });
	}
	return res.status(400).send({ message: 'product not found' });
});

server.put('/api/product/:id', (req, res) => {
	const productIndex = products.findIndex(
		(product) => product.id === Number(req.params.id)
	);
	// console.log(productExist);

	if (products[productIndex]) {
		// console.log(products[productIndex]);
		products[productIndex] = req.body;
		// console.log(req.body);
		return res.status(200).send({ product: products });
	} else if (productIndex === -1) {
		if (Object.keys(req.body).length > 0) {
			products.push(req.body);
			return res.status(200).send({ product: products });
		}
		return res.status(400).send({ message: 'Add items' });
	}

	// return res.status(400).send({ message: 'product not found' });
});

server.delete('/api/product/:id', (req, res) => {
	const productIndex = products.filter(
		(product) => product.id !== Number(req.params.id)
	);

	if (productIndex) {
		// console.log(productIndex);
		products = productIndex;
		return res.status(200).send({ product: products });
	}
	return res.status(400).send({ message: 'product not found' });

	// objArr.filter((data) => data.name != 'Ragnar');
});

server.all('*', (req, res) => {
	res.status(404).send({ message: 'route not found' });
});

server.listen(4000, () => {
	console.log(`Server Started on port ${Port}`);
});
