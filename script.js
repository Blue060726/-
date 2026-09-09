var names = [];
var timer = null;

// 添加名字
function addName() {
  var input = document.getElementById("nameInput");
  var name = input.value.trim();
  if (name === "") { alert("请输入姓名！"); return; }
  if (names.indexOf(name) !== -1) { alert("名字已存在！"); return; }
  names.push(name);
  input.value = "";
  showList();
}

// 批量添加
function batchAdd() {
  var text = document.getElementById("batchInput").value.trim();
  if (text === "") { alert("请先输入名字！"); return; }
  var arr = text.split(/[\n,，\s]+/);
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i].trim();
    if (name !== "" && names.indexOf(name) === -1) {
      names.push(name);
      count++;
    }
  }
  alert("成功添加 " + count + " 人");
  document.getElementById("batchInput").value = "";
  showList();
}

// 清空名单
function clearAll() {
  if (confirm("确定清空全部名单吗？")) {
    names = [];
    showList();
  }
}

// 显示名单
function showList() {
  var listDiv = document.getElementById("nameList");
  listDiv.innerHTML = "";
  for (var i = 0; i < names.length; i++) {
    var tag = document.createElement("span");
    tag.className = "nameTag";
    tag.textContent = names[i];
    listDiv.appendChild(tag);
  }
  document.getElementById("countText").textContent = "共 " + names.length + " 人";
}

// 开始点名
function start() {
  if (names.length === 0) { alert("名单是空的！"); return; }
  var pickCount = parseInt(document.getElementById("pickCount").value);
  if (pickCount > names.length) { alert("人数不够！"); return; }
  document.getElementById("showName").innerHTML = "";
  timer = setInterval(function() {
    var index = Math.floor(Math.random() * names.length);
    document.getElementById("showName").textContent = names[index];
  }, 60);
}

// 停止
function stop() {
  clearInterval(timer);
  timer = null;
  var pickCount = parseInt(document.getElementById("pickCount").value);
  var pool = names.slice();
  var result = [];
  for (var i = 0; i < pickCount && pool.length > 0; i++) {
    var index = Math.floor(Math.random() * pool.length);
    result.push(pool[index]);
    pool.splice(index, 1);
  }
  var showDiv = document.getElementById("showName");
  showDiv.innerHTML = "";
  if (result.length === 1) {
    showDiv.textContent = result[0];
  } else {
    for (var j = 0; j < result.length; j++) {
      var tag = document.createElement("span");
      tag.style.background = "#ff9a56";
      tag.style.color = "white";
      tag.style.padding = "5px 15px";
      tag.style.margin = "3px";
      tag.style.fontSize = "20px";
      tag.textContent = result[j];
      showDiv.appendChild(tag);
    }
  }
}
