class Buy{
  exec(item, money, itemID){
    let canBuy = false
    item.canBuyItems(money.total).forEach(function(i) {
      if(i.id == itemID){
        canBuy = true
        i.stock -= 1
        money.total -= i.price
      }
    })
    return canBuy
  }
}
module.exports = Buy
