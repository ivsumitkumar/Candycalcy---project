var Q = new Array(10);
var M = new Array(10);
var M1 = new Array(10);
var A = new Array(10);
var Q_ = 0;

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
  // createli("Multiplicand :",q);
  // createli("Multiplier :",m);
  var index = generateQ_M_M1(q, m);
  algo(index + 1, index,m); //count,index
}

function generateQ_M_M1(q, m) {
  var q_sign = q >= 0 ? 0 : 1; // initialising sign bit of Q
  var m_sign = m >= 0 ? 0 : 1; // initialising sign bit of M
  var m1_sign = m_sign == 0 ? 1 : 0; // initialising sign bit of M1

  var iq = toBinary(q, "q"); //last bit                   
  createli("binary value of Q is",value="",i=iq,ch='q')
  var im = toBinary(m, "m"); //last bit
  createli("binary value of M is",value="",i=im,ch='m')

  if (q < 0) {
    //condition for finding two's complement of Q
    ones_comp(iq, "q"); //function to find one's complement
    twos_comp(iq, "q"); //function to find two's complement
    Q[++iq] = q_sign; //adding sign bit
  } //else Q[++iq] = q_sign;

  if (m < 0) {
    //condition for finding two's complement of M
    ones_comp(im, "m"); //function to find one's complement
    twos_comp(im, "m"); //function to find two's complement
    M[++im] = m_sign; //adding sign bit
  } //else M[++im] = m_sign;

  iq = im = bit_checker(iq, im, q_sign, m_sign); //equating the number of bits

  var im1 = generate_m1(im); //function to generate -M(M1) by M
  M1[++im1] = m1_sign; //adding sign bit in M1
  Q[++iq] = q_sign; //again adding sign bit in Q
  M[++im] = m_sign; //again adding sign bit in M

  var a = iq; // index for Accumulator register
  for (var i = 0; i <= a; ++i) A[i] = 0; //creating accumulator register

  createli("final values are:");
  createli("Q=","",iq,'q');
  createli("M=","",im,'m');
  createli("-M=","",iq,'m1');
  createli("A=","",iq,'a');
  return iq; //no. of bits
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

function ones_comp(i, ch) {
  var k = 0;
  if (ch == "q") {
    //checking for Q
    while (k <= i) {
      Q[k] = Q[k] == 0 ? 1 : 0; // nagating the bits
      k++;
    }
  } //checking for M
  else {
    while (k <= i) {
      M[k] = M[k] == 0 ? 1 : 0; // negating the bits
      k++;
    }
  }
}

function twos_comp(i, ch) {
  var k;
  if (ch == "q") {
    //checking for Q
    for (
      k = 0;
      k <= i;
      k++ //finding 2's complement
    ) {
      if (Q[k] == 1) Q[k] = 0;
      //changing the bit
      else {
        Q[k] = 1; //changing the  bit
        break; //terminating the function
      }
    }
  } //doing for M
  else {
    for (
      k = 0;
      k <= i;
      k++ //finding 2's complement
    ) {
      if (M[k] == 1) M[k] = 0;
      //changing the bit
      else {
        M[k] = 1; //changing the  bit
        break; //terminating the program
      }
    }
  }
}

function bit_checker(q, m, q_sign, m_sign) {
  while (q != m) {
    //for equating the no. of bits
    if (q > m)
      //Q has more no. of bits
      M[++m] = m_sign;
    //M has more no. of bits
    else Q[++q] = q_sign;
  }
  return q;
}

function generate_m1(m) {
  var k = m;
  while (k >= 0) {
    //copying M in M1
    M1[k] = M[k];
    k--;
  }
  for (k = 0; k <= m; k++) M1[k] = M1[k] == 0 ? 1 : 0; //ones complement
  for (k = 0; k <= m; k++) {
    if (M1[k] == 1) M1[k] = 0;
    //changing the bit
    else {
      M1[k] = 1; //changing the  bit
      break; //terminating the conversion
    }
  }
  return m;
}

function algo(count, index,m) {
  print_line(count, index, "initial"); //initial step

  while (count > 0) {
    lshift(index);
    print_line(count, index, "SHL A,Q"); //logical left shifting A,Q
    var a=todecimal(index);
    subtraction(index); //A=A-M
    print_line(count, index, "A<-A-M"); //A=A-M
    if((a-m)<0){
      Q[0]=0;
      addition(index);
      count=count-1;
      print_line(count, index, "Q.<-0 and A<-A+M and count--"); //Q.=0 and A=A+M ,decreasing count
      
    }
    else{
      Q[0]=1;
      count=count-1;
      print_line(count, index, "Q.<-1 and count--"); //Q.<-1 ,decreasing count
    }    
  }
  var quotient=print(index,'q');
  var remainder=print(index,'a');
  createli("Quotient:",quotient);
  createli("Remainder:",remainder);
}  
function todecimal(index){
  var a_bin=A.slice(0,index+1); //reversed binary
  a_bin=a_bin.reverse(); //original binary
  var a=a_bin.join(""); //array to string
  a=parseInt(a,2);  //string to decimal
  return a;
}

function print_line(count, index, step) {
  var tbl = document.getElementById("mytable");
  var row = tbl.insertRow();
  var col1 = row.insertCell();
  var col2 = row.insertCell();
  var col3 = row.insertCell();
  var col4 = row.insertCell();
  col1.innerHTML = print(index, "a");
  col2.innerHTML = print(index, "q");
  col3.innerHTML = count;
  col4.innerHTML = step;
}

function addition(index) {
  var carry = 0;
  for (var i = 0; i <= index; ++i) {
    var temp = parseInt((A[i] + M[i] + carry) % 2); //storing the added bit in temp variable
    carry = parseInt((A[i] + M[i] + carry) / 2); //finding carry
    A[i] = temp; //changing the current bit
  }
}

function subtraction(index) {
  var carry = 0;
  for (var i = 0; i <= index; ++i) {
    var temp = parseInt((A[i] + M1[i] + carry) % 2); //storing the added bit in temp variable
    carry = parseInt((A[i] + M1[i] + carry) / 2); //finding carry
    A[i] = temp; //changing the current bit
  }
}

function lshift(index) {
  var i;
  for (i=index;i>=0;i--)
    A[i]=A[i-1];  //shifting left A
  A[0]=Q[index];  //LSB of A=MSB of Q
  for(i=index;i>=0;i--)
    Q[i]=Q[i-1];  //shifting left Q
  Q[0]=0;  //LSB of Q=0 bcox of logical shifting
}
