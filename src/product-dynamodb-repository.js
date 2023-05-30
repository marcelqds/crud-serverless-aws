const DynamoDB = require('aws-sdk/clients/dynamodb');
const AWS = require('aws-sdk');


class ProductDynamoDBRepository {
	dynamoDB;
	tableName = 'Products';	
	
	constructor(){
		this.dynamoDB = new DynamoDB({ region: 'sa-east-1'});		
	}

	async save(data){		
		const{ id, description, createdAt } = data.values();
		
		return new Promise((res) => {		
			this.dynamoDB.putItem({
				TableName: this.tableName,
				Item:{
					id: {S: id},
					description: {S: description},
					createdAt: {S: createdAt}
				}
			}, (err, dt) => {
				if(err) throw new Error('Problema ao cadastrar um novo produto.'+
				' Tente mais tarde!');
				
				return res(dt);
			});		
		});
	}

	async update(description, id){		
		return new Promise((res) => {
			this.dynamoDB.updateItem({
				TableName: this.tableName,
				Key:{ id: {S: id} },
				UpdateExpression: 'set description = :n',
				ExpressionAttributeValues: { ':n': {S: description}},
				ReturnValues: 'ALL_NEW'
			}, (err, data) => {
				if(err) throw new Error(err.message);
				/*throw new Error('Error ao tentar atualizar!' +
				' Tente novamente mais tarde');*/
				res(data);
			});
		});
	}

	async getById(id){
		return new Promise((res) =>{
			this.dynamoDB.getItem({
				TableName: this.tableName,
				Key: { id: {'S': id } }
											
			}, (err, data) => {
				if(err) throw new Error('Não foi possível trazer o produto' +
				' para o id informado');
				res(data);
			});
		});
	}

	async list(){
		return new Promise((res) => {			
			 this.dynamoDB.scan({
				TableName: this.tableName
			}, (err, data) => {
				if(err) throw new Error("Não foi possível carregar os produtos!"+
				"Tente novamente mais tarde.");
				res(data);
			});
		});
	}
}

module.exports = ProductDynamoDBRepository;