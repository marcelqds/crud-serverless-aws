const ProductDynamoDBRepository = require('./product-dynamodb-repository');


module.exports.productList = async(event) => {
	try{
		const repository = new ProductDynamoDBRepository();
		let products = await repository.list();

		products = await products.Items.map(product => {			
			return {
				description: product.description.S,
				id: product.id.S,
				createdAt: product.createdAt.S,
			}
		});
		
		return{
			statusCode:200,
			body:JSON.stringify({ products })
		}
	}catch(e){
		return {
			statusCode: 500,
			body: JSON.stringify({ error: e.message})
		}
	}	
}