const request = require('request-promise'),
  to = require('await-to-js').to,
  { getFirstKey } = require('../utils'),
  StockSymbol = require('../models/StockSymbol')

const getChartsData = async () =>
  new Promise(async (resolve, reject) => {
    ;[dbError, stockSymbols] = await to(StockSymbol.find())

    if (dbError)
      return reject('An error occured while retrieving stock symbols')
    if (stockSymbols.length === 0)
      return reject('No stock symbols registered yet')
    ;[error, chartsData] = await to(
      (() => {
        // Make a string separated by comma of the names from the retrieved stockSymbols in DB
        // Then create the url and request the batched payload
        const stockSymbolsNames = stockSymbols.map(({ name }) => name)
        const URL = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockSymbolsNames.join()}&types=chart&range=1m`
        return request(URL)
          .then(res => JSON.parse(res))
          .then(allSymbols => {
            //Then we create an array of all dates
            const dates = getFirstKey(getFirstKey(allSymbols)).map(
              ({ date }) => date
            )
            //We iterate over the dates
            const output = dates.reduce((acc, date, dateIndex) => {
              // Creating a date point object with the date as prop
              const datePoint = {
                date
              }
              //For each symbol we add a key to the datepoint equal to the corresponding symbol data
              // The trick is that we access
              stockSymbolsNames.forEach(
                (s, i) => (datePoint[s] = allSymbols[s].chart[dateIndex])
              )
              //FInally we push the whole object in the accumulator
              acc.push(datePoint)
              return acc
            }, [])

            return output
          })
      })()
    )
    return error
      ? reject('An error occured while fetching charts data')
      : resolve(chartsData)
  })

module.exports = getChartsData
