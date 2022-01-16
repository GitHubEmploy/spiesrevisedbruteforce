class binaryNode {
  constructor(object) {
    this.value = object;
    this.left = null;
    this.right = null;
  }

  add(object) {
    if (this.value == null) {
      this.value = object;
      return false;
    }
    let compared = this.value.compareTo(object);
    if (isNaN(compared)) {
      console.error("found a nan", object);
      throw "found NaN";
    }
    if (compared === 0) {
      return true;
    } else if (compared < 0) {
      if (this.right == null) {
        return this.right = new binaryNode(object);
      } else {
        return this.right.add(object);
      }
    } else if (compared > 0) {
      if (this.left == null) {
        return this.left = new binaryNode(object);
      } else {
        return this.left.add(object);
      }
    }
  }

  find(object) {
    if (this.value == null) {
      throw new Error("shouldn't ever see this");
    }
    let compared = this.value.compareTo(object);
    if (compared === 0) {
      return true;
    } else if (compared < 0) {
      if (this.right != null) {
        return this.right.find(object);
      } else {
        return false;
      }
    } else if (compared > 0) {
      if (this.left != null) {
        return this.left.find(object);
      } else {
        return false;
      }
    }
  }
}

exports.binaryNode = binaryNode;
