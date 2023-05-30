const Product = require('./product-entity');
const ProductDynamoDBRepository = require('./product-dynamodb-repository');


module.exports.productInsert = async (event) => {
	try{
		
		const { body } = event;
		const product = new Product(JSON.parse(body));		
		const repository = new ProductDynamoDBRepository();
		await repository.save(product);

		return {
			statusCode: 204			
		};
		
	}catch(e){
		return {
			statusCode: 401,
			body: JSON.stringify({
				error: e.message
			})
		}
	}
}