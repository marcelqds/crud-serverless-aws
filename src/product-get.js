const ProductDynamoDBRepository = require('./product-dynamodb-repository');


module.exports.productGet = async(event) => {
	
	const { id } = event.pathParameters;	
	const repository = new ProductDynamoDBRepository();
	const data = await repository.getById(id);	
	let product = {};
	
	if(!data.Item) return { 
		statusCode: 404, 
		body: JSON.stringify({ error: "Produto não existe!"})
	}

	product = {
		id: data.Item.id.S,
		description: data.Item.description.S,
		createdAt: data.Item.id.S
	};

	return{
		statusCode: 200,
		body:JSON.stringify( product )
	}
}