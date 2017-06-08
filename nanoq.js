
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
    let r = this.data[1];
    this.data[1] = this.data[(this.p--) - 1];
    this.sink(1);
    return r;
  }

  sink(i)
  {
    let i2, i21, m;
    while(i << 1 <= this.p)
    {
      i2 = i << 1; i21 = i2++;
      m = (i21 > this.p) ? i2 : this.c(i21, i2) ? i2 : i21; // nb: .c(b,a)

      if (this.c(i, m))
        [this.data[i], this.data[m]] = [this.data[m], this.data[i]];
      else return;
      i = m;
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
