class Money{
  constructor() {
    this.allows = { 10: true, 50: true, 100: true,500: true, 1000: true }
    this.total = 0
  }
  
  isOk(money) {
    return this.allows[money]
  }

  input(money) {
    if(this.isOk(money) !== true){
      this.change(money)
      return false
    }
    this.total += money
    return true
  }

  change(money) {
    console.log(money)
  }

  reset() {
    if(this.total > 0){
      this.change(this.total)
    }
    this.total = 0
  }
}
module.exports = Money
