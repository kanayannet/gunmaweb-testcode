class Item{
  constructor() {
    this.items = [{ id: 1, name: 'コーラ', price: 120, stock: 5 },
      { id: 2, name: 'レッドブル', price: 200, stock: 5 }]
  }

  canBuyItems(money) {
    let items = []
    this.items.forEach(function(item){
      if(item.stock >= 1 && item.price <= money){
        items.push(item)
      }
    })
    return items
  }
}
module.exports = Item
