module.exports = function nanoq(max, compare) {
  this.tree = !max ? [0]:(max<65536 ? (max<256 ? new Uint8Array(max):new Uint16Array(max)):new Uint32Array(max));
  this.p = Number(!!(this.cmp = compare || function(a,b){return a>b}));  // lol?
  this.peek = function() {return this.tree[1];};
  this.length = function() {return this.p-1;};
  this.push = function(n) {
      var q=this.p++, p, v, t = this.tree, c = this.cmp;
      while((p = q >> 1) > 0) {
        v = t[p];
        if (c(n, v)) break;
        t[q] = v; q=p;
      }
      t[q] = n;
  };
  this.pop = function() {
    if (this.p==1) return null;
    var t = this.tree, c = this.cmp, p=--this.p, r=t[1], b=t[p], n=1, j, v;
    while((j = n << 1) < p) {
      if (j+1 <= p) if (c(t[j],t[j+1])) j++; v = t[j];
      if (c(v, b)) break;
      t[n] = v; n = j;
    }
    t[n] = b;
    return r;
  };
}
