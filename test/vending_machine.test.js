
const Money = require('../lib/money.js')
const Item = require('../lib/item.js')
const Buy = require('../lib/buy.js')

const money = new Money()
const item = new Item()
const buy = new Buy()

let safeMoneys = [10, 50, 100, 500, 1000]
let outMoneys = [1, 5, 5000, 10000]

describe('硬貨・紙幣の投入と払い戻し', () => {
  test('大丈夫な硬貨・紙幣', () => {
    safeMoneys.forEach(function(val){
      expect(money.input(val)).toBeTruthy()
    })
    expect(money.total).toBe(1660)
  })

  test('払い戻し操作', () => {
    expect(money.total).toBe(1660)
    console.log('投入金額1660円返却')
    money.reset()
  })

  test('ダメな硬貨・紙幣', () => {
    console.log('ダメな硬貨・紙幣:')
    outMoneys.forEach(function(val){
      expect(money.input(val)).toBeFalsy()
    })
  })

  test('返却後、投入金額が0になるか?', () => {
    expect(money.total).toBe(0)
  })
})

describe('購入する', () => {
  test('100円では買えない、何もおきない', () => {
    money.input(100)
    expect(item.canBuyItems(money.total).length === 0).toBeTruthy()
    expect(buy.exec(item, money, 1)).toBeFalsy()
    expect(money.total).toBe(100)
    expect(item.items[0].stock).toBe(5)
  })

  test('200円でコーラが1本買えてお釣りが80円, 在庫は4本になる', () => {
    money.input(100)
    expect(buy.exec(item, money, 1)).toBeTruthy()
    expect(money.total).toBe(80)
    expect(item.items[0].stock).toBe(4)
    console.log('200円で購入後80円お釣り')
    money.reset()
  })
})

describe('複数商品で購入する', () => {
  test('200円でレッドブル, コーラが購入可能商品として得られる', () => {
    money.input(100)
    money.input(100)
    expect(item.canBuyItems(money.total)).toContainEqual({ id: 1, name: 'コーラ', price: 120, stock: 4 })
    expect(item.canBuyItems(money.total)).toContainEqual({ id: 2, name: 'レッドブル', price: 200, stock: 5 })
  })

  test('200円でレッドブル買ったらコーラは買えない', () => {
    expect(buy.exec(item, money, 2)).toBeTruthy()
    expect(buy.exec(item, money, 1)).toBeFalsy()
    expect(money.total).toBe(0)
    expect(item.items[0].stock).toBe(4)
    expect(item.items[1].stock).toBe(4)
    money.reset()
  })
})
