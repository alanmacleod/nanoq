
export default class nanoq
{
  constructor(max, compare)
  {
    this.data = max < 65537 ? (max < 257 ? new Uint8Array(max) :
                new Uint16Array(max)) : new Uint32Array(max);
    this.c = compare || ((a, b) => this.data[a] > this.data[b]);
    this.peek = () => { return this.data[1]; }
  }

  push(i)
  {
    if (this.p) this.data[this.p++] = i;      // append
    else this.data[(this.p = 2) - 1] = i;     // init
    this.swim();
  }

  pop()
  {
    if (this.p == 1) return null;
    let r = this.data[1];
    this.data[1] = this.data[(this.p--) - 1];
    this.sink(1);
    return r;
  }

  sink(i)
  {
    let a, b, c;
    while(i << 1 < this.p)
    {
      a = i << 1; b = a+1;
      c = (b > this.p) ? a : this.c(b, a) ? a : b;

      if (this.c(i, c))
        [this.data[i], this.data[c]] = [this.data[c], this.data[i]];
      else return;
      i = c;
    }
  }

  swim()
  {
    let p = this.p - 1, q = p >> 1;
    while (p && this.c(q, p))
    {
      [this.data[q], this.data[p]] = [this.data[p], this.data[q]];
      q = (p >>= 1) >> 1;
    }
  }
}
