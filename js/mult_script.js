var Q = new Array(10);
var M = new Array(10);
var A = new Array(10);
var c;
function createli(sentence = null,value="", i = null, ch = null) {
  if (i != null) value = print(i, ch);
  sentence = sentence + " " + value;
  var node = document.createElement("LI");
  var textnode = document.createTextNode(sentence);
  node.appendChild(textnode);
  document.getElementById("mylist").appendChild(node);
}
function main(q, m) {
  q = parseInt(q);
  m = parseInt(m);
  createli("Multiplicand :",q);//function for creating a specific list item in the output panel
  createli("Multiplier :",m);
  generate(q, m);
  
}
function generate(q, m) {
    var iq = toBinary(q, "q"); //last bit
    createli("binary value of Q is",value="",i=iq,ch='q')
    var im = toBinary(m, "m"); //last bit
    createli("binary value of M is",value="",i=im,ch='m')
    
    var a = im; // index for Accumulator register (size of A=size of M)
    for (var i = 0; i <= a; ++i) A[i] = 0; //creating accumulator register
  
    var count=iq+1; //count=bits in Q
    
    createli("final values are:");
    createli("Q=","",iq,'q');
    createli("M=","",im,'m');
    createli("A=","",a,'a');
    createli("count:",count);  
    
    algo(count,iq,im,a); //count,iq,im,a
    var ans=print(a,'a');
    ans+=print(iq,'q');
    createli("Final Product: ",ans)
}

function toBinary(dec, ch) {
  var i = 0;
  if (dec < 0) dec = dec * -1; // making negative no. positive
  if (ch == "q") {
    //checking whether to convert Q ?
    while (dec != 0) {
      Q[i] = dec % 2; //storing binary of Q in Q array
      dec = dec / 2;
      dec = parseInt(dec);
      i++;
    }
    return i - 1; //returning the last index of Q
  } //checking whether to convert M
  else {
    while (dec != 0) {
      M[i] = dec % 2; //storing binary of M in M array
      dec = dec / 2;
      dec = parseInt(dec);
      i++;
    }
    return i - 1; //returning the last index of M
  }
}

function print(i, ch) {
  var qbin = "";
  var mbin = "";
  var abin = "";
  var m1bin = "";
  if (ch == "q") {
    //printing Q
    while (i >= 0) qbin += Q[i--];
    // console.log(qbin);
    return qbin;
  } else if (ch == "m") {
    //printing M
    while (i >= 0) mbin += M[i--];
    // console.log(mbin);
    return mbin;
  } else if (ch == "a") {
    while (i >= 0) abin += A[i--];
    // console.log(abin);
    return abin;
  } //printing -M
  else {
    while (i >= 0) m1bin += M1[i--];
    // console.log(m1bin);
    return m1bin;
  }
}

function algo(count,iq,im,a) {
    c=0;  //initially c=0  __c is carry
    print_line(count, iq,a,c, "initial"); //initial step
    
    while (count > 0) {
        if(Q[0]==1){
            addition(im);
            print_line(count, iq,a,c, "A<-A+M"); //A=A+M
        }
        rshift(a,iq);
        count=count-1;
        print_line(count, iq,a,c, "Shr C,A,Q and count-1"); //LShr C,A,Q and count-1        
    }
}

function print_line(count, iq,a,c, step) {
  var tbl = document.getElementById("mytable");
  var row = tbl.insertRow();
  var col1 = row.insertCell();
  var col2 = row.insertCell();
  var col3 = row.insertCell();
  var col4 = row.insertCell();
  var col5 = row.insertCell();
  col1.innerHTML = count;
  col2.innerHTML = c;
  col3.innerHTML = print(a, "a");
  col4.innerHTML = print(iq, "q");
  col5.innerHTML = step;
}

function addition(index) {
  var carry = 0;
  for (var i = 0; i <= index; ++i) {
    var temp = parseInt((A[i] + M[i] + carry) % 2); //storing the added bit in temp variable
    carry = parseInt((A[i] + M[i] + carry) / 2); //finding carry
    A[i] = temp; //changing the current bit
  }
  c=carry;   //storing carry in c(carry)
}

function rshift(a,iq) {
  var i;
  for (i=0;i<iq;i++) Q[i]=Q[i+1];   //right shifting Q
  Q[iq]=A[0];  //MSB of Q=LSB of A
  for (i=0;i<a;i++) A[i]=A[i+1];  //right shifting A
  A[a]=c;
  c=0;
}