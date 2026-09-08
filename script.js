var names = [];

function addName() {
  var input = document.getElementById("nameInput");
  var name = input.value.trim();
  if (name === "") { alert("请输入姓名！"); return; }
  if (names.indexOf(name) !== -1) { alert("名字已存在！"); return; }
  names.push(name);
  input.value = "";
  showList();
}

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

function clearAll() {
  if (confirm("确定清空全部名单吗？")) {
    names = [];
    showList();
  }
}

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
