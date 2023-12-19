// ミス1: 変数を宣言せずに使用する
function missingVariableExample() {
  console.log(myVariable); // myVariableが未定義のまま使用されている
}

// ミス2: セミコロンを忘れる
function missingSemicolonExample() {
  var x = 5;
  var y = 10; // セミコロンがない
  console.log(x + y);
}

// ミス3: 関数の引数を忘れる
function missingArgumentExample(a, b) {
  return a + b;
}

// ミス4: 関数の戻り値を返さない
function missingReturnValueExample(a, b) {
  var result = a + b;
}

// ミス5: 変数の型を適切に処理しない
function typeMismatchExample() {
  var x = "5";
  var y = 10;
  console.log(x + y); // 文字列と数値の加算が行われる
}

// 関数呼び出し例
missingVariableExample(); // ミス1を示す
missingSemicolonExample(); // ミス2を示す
missingArgumentExample(); // ミス3を示す
missingReturnValueExample(3, 7); // ミス4を示す
typeMismatchExample(); // ミス5を示す
