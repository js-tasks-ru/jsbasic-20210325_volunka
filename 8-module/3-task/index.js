export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let id = product.id;
    let existCartItemIndex;
    const existCartItem = this.cartItems.find((item, index) => {

      if (id === item.product.id) {
        existCartItemIndex = index;
        return true;
      } else {
        return false;
      };

    });

    if (existCartItem) {
      this.cartItems[existCartItemIndex].count++;
      this.onProductUpdate(existCartItem);
    } else {
      const productItemToAdd = {
        product: product,
        count: 1,
      };

      this.cartItems.push(productItemToAdd);
      this.onProductUpdate(productItemToAdd);
    }
  }

  updateProductCount(productId, amount) {
    let targetCartItemIndex;
    const targetCartItem = this.cartItems.find((item, index) => {

      if (productId === item.product.id) {
        targetCartItemIndex = index;
        return true;
      } else {
        return false;
      };

    });

    if (targetCartItem) {
      this.cartItems[targetCartItemIndex].count += amount;
      if (this.cartItems[targetCartItemIndex].count <= 0) {
        this.cartItems.splice(targetCartItemIndex, 1);
        this.onProductUpdate(targetCartItem);
      } else {
        this.onProductUpdate(targetCartItem);
      };
    };

  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((previousValue, item) => previousValue += item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((previousValue, item) => previousValue += item.count * item.product.price, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

