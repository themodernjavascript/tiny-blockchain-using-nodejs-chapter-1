var SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, data, prevHash) {
    this.index = index;
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
  }

  getHash() {
    return SHA256(JSON.stringify(this.data) + this.prevHash + this.index + this.timestamp).toString();
  }
}

class BlockChain {
  constructor(){
    this.chain = [];
  }

  addBlock(data) {
    let index = this.chain.length;
    let prevHash = this.chain.length !== 0 ? this.chain[this.chain.length - 1].hash : 0;
    let block = new Block(index, data, prevHash);

    this.chain.push(block);
  }

  chainIsValid() {
    for(var i=0;i<this.chain.length;i++){
      if(this.chain[i].hash !== this.chain[i].getHash()) 
        return false;
      if(i > 0 && this.chain[i].prevHash !== this.chain[i-1].hash)
        return false;
    }
    return true;
  }
}

const myCoin = new BlockChain();

myCoin.addBlock({sender: "Brian", reciver: "Ryan", amount: 100});
myCoin.addBlock({sender: "Bunlong", reciver: "Harry", amount: 50});
myCoin.addBlock({sender: "Ken", reciver: "Jinglong", amount: 75});

console.log(JSON.stringify(myCoin, null, 2));

console.log("Validity: ", myCoin.chainIsValid());
myCoin.chain[0].data.amount = 120;
console.log("Validity: ", myCoin.chainIsValid());
