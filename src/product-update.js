const ProductDynamoDBRepository = require('./product-dynamodb-repository');
const Product = require('./product-entity');


module.exports.productUpdate = async(event) => {

	try{	
		const { id } = event.pathParameters;
		const { description } = event.body;
		
		const productUpdate = new Product({ description }, id);		
		const repository = new ProductDynamoDBRepository();
		const product = await repository.getById(id);
				
		if(!product.Item){
			return {
				statusCode: 404,
				body: JSON.stringify({ error: "Produto não existe!"})
			}
		}
		
		await repository.update(productUpdate.values().description, id);		
		return{ statusCode: 204 }
		
	}catch(e){
		return {
			statusCode: 500,
			body: JSON.stringify({ error: e.message })
		}
	}
}