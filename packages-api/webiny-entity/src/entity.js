const Driver = require('./driver');
const EventHandler = require('./eventHandler');
const EntityCollection = require('./entityCollection');
const _ = require('lodash');

class Entity {
	constructor() {
		const proxy = new Proxy(this, {
			set: (instance, key, value) => {
				const attr = instance.getModel().getAttribute(key);
				if (attr) {
					attr.setValue(value);
					return true;
				}

				instance[key] = value;
				return true;
			},
			get: (instance, key) => {
				if (['classId', 'driver'].includes(key)) {
					return instance.constructor[key];
				}

				if (instance[key]) {
					return instance[key];
				}

				const attr = instance.getModel().getAttribute(key);
				if (attr) {
					return attr.getValue();
				}

				return undefined;
			}
		});

		this.model = this.getDriver().getModelClass();
		this.model = new this.model().setParentEntity(proxy);

		if (!this.model) {
			throw Error('Entity model is missing.');
		}

		this.listeners = {};
		this.existing = false;

		this.getDriver().onEntityConstruct(proxy);

		if (!this.getAttribute('id')) {
			this.attr('id').char();
		}

		return proxy;
	}

	getModel() {
		return this.model;
	}

	static getDriver() {
		return this.driver;
	}

	getDriver() {
		return this.constructor.driver;
	}

	setExisting(flag = true) {
		this.existing = flag;
		return this;
	}

	isExisting() {
		return this.existing;
	}

	attr(attribute) {
		return this.getModel().getAttributesContainer().attr(attribute);
	}

	getAttribute(attribute) {
		return this.getModel().getAttribute(attribute);
	}

	getAttributes() {
		return this.getModel().getAttributes();
	}

	async toJSON(path = null) {
		return this.getModel().toJSON(path);
	}

	async toStorage() {
		return this.getModel().toStorage();
	}

	async validate() {
		return this.getModel().validate();
	}

	populate(data) {
		this.getModel().populate(data);
		return this;
	}

	populateFromStorage(data) {
		this.getModel().populateFromStorage(data);
		return this;
	}

	async save(params = {}) {
		const existing = this.isExisting();

		if (existing) {
			await this.emit('beforeUpdate');
		} else {
			await this.emit('beforeCreate');
		}

		await this.emit('beforeSave');
		await this.getDriver().save(this, params);
		this.setExisting();
		await this.emit('afterSave');

		if (existing) {
			await this.emit('afterUpdate');
		} else {
			await this.emit('afterCreate');
		}

		this.getModel().clean();
		return this;
	}

	async delete(params = {}) {
		if (this.getAttribute('id').isEmpty()) {
			throw Error('Entity cannot be deleted because it was not previously saved.');
		}

		await this.emit('beforeDelete');
		await this.getDriver().delete(this, params);
		await this.emit('afterDelete');
		return this;
	}

	static async findById(id, params = {}) {
		const paramsClone = _.cloneDeep(params);
		await this.emit('query', {type: 'findById', id, params: paramsClone});
		if (!id) {
			return null;
		}

		const queryResult = await this.getDriver().findById(this, id, paramsClone);
		if (queryResult.getResult()) {
			return await new this().setExisting().populateFromStorage(queryResult.getResult()).emit('load');
		}
		return null;
	}

	static async findByIds(ids, params = {}) {
		const paramsClone = _.cloneDeep(params);
		await this.emit('query', {type: 'findByIds', params: paramsClone});

		const queryResult = await this.getDriver().findByIds(this, ids, paramsClone);
		const entityCollection = new EntityCollection().setParams(paramsClone).setMeta(queryResult.getMeta());
		if (queryResult.getResult()) {
			for (let i = 0; i < queryResult.getResult().length; i++) {
				entityCollection.push(await new this().setExisting().populateFromStorage(queryResult.getResult()[i]).emit('loaded'));
			}
		}

		return entityCollection;
	}

	static async findOne(params = {}) {
		const paramsClone = _.cloneDeep(params);
		await this.emit('query', {type: 'findOne', params: paramsClone});

		const queryResult = await this.getDriver().findOne(this, paramsClone);
		if (queryResult.getResult()) {
			const entity = new this().setExisting().populateFromStorage(queryResult.getResult());
			await entity.emit('load');
			return entity;
		}
		return null;
	}

	static async find(params = {}) {
		const paramsClone = _.cloneDeep(params);
		await this.emit('query', {type: 'find', params: paramsClone});

		const queryResult = await this.getDriver().find(this, paramsClone);
		const entityCollection = new EntityCollection().setParams(paramsClone).setMeta(queryResult.getMeta());
		if (queryResult.getResult()) {
			for (let i = 0; i < queryResult.getResult().length; i++) {
				entityCollection.push(await new this().setExisting().populateFromStorage(queryResult.getResult()[i]).emit('loaded'));
			}
		}

		return entityCollection;
	}

	static async count(params = {}) {
		const paramsClone = _.cloneDeep(params);
		await this.emit('query', {type: 'count', params: paramsClone});

		const queryResult = await this.getDriver().count(this, paramsClone);
		return queryResult.getResult();
	}

	on(name, callback) {
		const eventHandler = new EventHandler(name, callback);
		if (!this.listeners[eventHandler.getName()]) {
			this.listeners[eventHandler.getName()] = [];
		}
		this.listeners[eventHandler.getName()].push(eventHandler);
		return eventHandler;
	}

	static on(name, callback) {
		if (!this.listeners) {
			this.listeners = {};
		}

		const eventHandler = new EventHandler(name, callback);
		if (!this.listeners[eventHandler.getName()]) {
			this.listeners[eventHandler.getName()] = [];
		}
		this.listeners[eventHandler.getName()].push(eventHandler);
		return eventHandler;
	}

	async emit(name, data) {
		if (this.listeners[name]) {
			for (let i = 0; i < this.listeners[name].length; i++) {
				await this.listeners[name][i].execute({...data, entity: this});
			}
		}

		if (this.constructor.listeners) {
			if (this.constructor.listeners[name]) {
				for (let i = 0; i < this.constructor.listeners[name].length; i++) {
					await this.constructor.listeners[name][i].execute({...data, entity: this});
				}
			}
		}
		return this;
	}

	static async emit(name, data) {
		if (_.get(this, 'listeners.name')) {
			for (let i = 0; i < this.listeners[name].length; i++) {
				await this.listeners[name][i].execute({...data, entity: this});
			}
		}
	}
}

Entity.classId = null;
Entity.driver = new Driver();

module.exports = Entity;