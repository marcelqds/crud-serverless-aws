const { randomUUID } = require('crypto');


class Product{
	props = {};
	
	constructor(props = {}, id){		
		this.#id = id;
		this.#description = props.description;
		this.#createdAt = props.createdAt;
	}

	update(description){
		this.#description = description;
	}
	
	toJSON(){
		const propsJson = JSON.stringify(this.props);
		return  propsJson;
	}

	set #description(value = ""){
		value = value.trim();
		if(!(value && value.length > 3))
			throw new Error("O nome deve ter 3 ou mais caracteres");
		this.props.description = value;
	}
	
	set #id(value){
		if(!value) value = randomUUID();		
		else if(!(value && value.length == 36)) throw new Error("Id inválido");
		this.props.id = value;
	}

	set #createdAt(value){
		const regDate = /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/;
		if(!value) this.props.createdAt = new Date().toISOString();
		else if(!(regDate.test(value))) throw new Error("Data inválida");
		
	}
	
	values(){
		const props = {...this.props};
		return props;
	}
}

module.exports = Product;