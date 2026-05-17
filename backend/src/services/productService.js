const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts(filters) {
    return await productRepository.findAll(filters);
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new Error('Ürün bulunamadı.');
    }
    return product;
  }

  async createProduct(productData) {
    // Fiyat ve stok validasyonu gibi iş mantıkları buraya eklenebilir
    if (productData.price <= 0) {
      throw new Error('Ürün fiyatı 0 veya negatif olamaz.');
    }
    
    return await productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Güncellenmek istenen ürün bulunamadı.');
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error('Ürün fiyatı 0 veya negatif olamaz.');
    }

    // Güncellenmeyen alanları eski değerleriyle koru
    const updatedData = { ...existingProduct, ...productData };
    return await productRepository.update(id, updatedData);
  }

  async deleteProduct(id) {
    const existingProduct = await productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Silinmek istenen ürün bulunamadı.');
    }

    await productRepository.delete(id);
    return { message: 'Ürün başarıyla silindi.' };
  }
}

module.exports = new ProductService();
