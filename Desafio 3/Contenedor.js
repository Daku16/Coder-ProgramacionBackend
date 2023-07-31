const fs = require('fs').promises
module.exports = class Contenedor {
    constructor(file) {
        this.file = file
        this.contador = 1
        fs.writeFile(file, [])
    }
    async save(object) {
        try {
            const id = this.contador++
            object.id = id
            const objects = await this.getAll()
            await objects.push(object)
            await fs.writeFile(this.file, JSON.stringify(objects, null, 2))
            return object.id
        } catch (error) {
            // throw new Error(`Error al guardar el objeto`)
        }
    }
    async getById(number) {
        try {
            const objects = await this.getAll()
            const product = objects.find((product) => product.id === number)
            return product
        } catch (error) {
            throw new Error(`Error al obtener el producto con el id`)
        }
    }
    async getAll() {
        try {
            const data = await fs.readFile(this.file, 'utf8')
            return data ? JSON.parse(data) : []
        } catch (error) {
            throw new Error('Error al obtener los productos')
        }
    }
    async deleteById(number) {
        try {
            const objects = await this.getAll()
            const products = objects.filter((product) => product.id !== number)
            await fs.writeFile(this.file, JSON.stringify(products, null, 2))
        } catch (error) {
            throw new Error(`Error al eliminar el producto con el id: ${number}`)
        }
    }
    async deleteAll() {
        try {
            await fs.writeFile(this.file, [])
        } catch (error) {
            throw new Error(`Error al eliminar los objetos`)
        }
    }
}
