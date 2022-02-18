const { ItemFlag } = require('../const')

const DataObjGenerator = (flag) => {
  const dataObj = {}
  switch (flag) {
    case ItemFlag.arms:
    case ItemFlag.armor:
    case ItemFlag.decorations:
    case ItemFlag.shentong:
    case ItemFlag.gongfa:
      for (let quality = 1; quality < 5; quality++) {
        for (let level = 1; level < 4; level++) {
          const levelKey = `${quality}${level}`
          dataObj[levelKey] = {}
        }
      }
      return dataObj
    case ItemFlag.medicine:
    case ItemFlag.medicineMaterial:
    case ItemFlag.material:
    case ItemFlag.medicinePrescription:
    case ItemFlag.stove:
    case ItemFlag.ship:
      for (let quality = 1; quality < 7; quality++) {
        dataObj[quality] = {}
      }
      return dataObj
    default:
      for (let quality = 1; quality < 7; quality++) {
        dataObj[quality] = {}
      }
      return dataObj
  }
}

module.exports = {
  DataObjGenerator
}
