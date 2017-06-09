export default class nanoq
{
  constructor(max, compare)
  {
    this.tree = !max ? [] : (max < 65536 ? (max < 256 ? new Uint8Array(max)  :
                             new Uint16Array(max))    : new Uint32Array(max));
    this.cmp = compare || ((a, b) => this.tree[a] < this.tree[b]);
    this.peek = () => { return this.tree[1]; }
  }

  push(n)
  {
    if (this.p) (this.tree[this.p++] = n) && this.swim();
    else        this.tree[(this.p = 2) - 1] = n;
  }

  pop()
  {
    if (this.p == 1 || !this.p) return null;
    let r = this.tree[1];
    return ((this.tree[1] = this.tree[(this.p--) - 1]) && this.sink(1)) || r;
  }

  sink(i)
  {
    let j, k, c;
    while((j = i<<1) < this.p) {
      k = j + 1;
      c = (k > this.p) ? j : this.cmp(k, j) ? j : k;
      if (this.cmp(i, c))
        [this.tree[i], this.tree[c]] = [this.tree[c], this.tree[i]];
      else return;
      i = c;
    }
  }

  swim()
  {
    let p = this.p - 1, q = p >> 1;
    while (q && this.cmp(q, p)) {
      [this.tree[q], this.tree[p]] = [this.tree[p], this.tree[q]];
      q = (p >>= 1) >> 1;
    }
  }
}
