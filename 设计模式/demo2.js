var Dragfiles = (function () {
  var instance;
  return function () {
    if (!instance) {
      instance = new FormData();
    }
    return instance;
  }
}());

FormData.prototype.deleteAll = function () {
  var _this = this;
  this.forEach(function (value, key) {
    _this.delete(key);
  })
}

var dz = document.getElementById('dropzone');
dz.ondragover = function (ev) {
  ev.preventDefault();
  this.style.borderColor = 'red';
}

dz.ondragleave = function () {
  this.style.borderColor = 'gray';
}
dz.ondrop = function (ev) {
  //恢复边框颜色
  this.style.borderColor = 'gray';
  //阻止浏览器默认打开文件的操作
  ev.preventDefault();
  var files = ev.dataTransfer.files;

  var len = files.length,
    i = 0;
  var frag = document.createDocumentFragment(); 
  var newForm = Dragfiles(); //获取单例
  var it = newForm.entries(); //创建一个迭代器，测试用

  while (i < len) {
    var p = document.createElement('p')
    p.innerHTML = files[i].name + '<span class="delete">删除</span</div>';

    frag.appendChild(p);

    newForm.append(files[i].name, files[i]);
    i++;
  }
  this.appendChild(frag);

}


//ajax上传文件
function upload() {
  if (document.getElementsByTagName('tbody')[0].hasChildNodes() == false) {
    document.getElementById('content').style.borderColor = 'red';
    setTimeout(blink, 200);
    return false;
  }
  var data = Dragfiles(); //获取formData
  $.ajax({
    url: 'upload',
    type: 'POST',
    data: data,
    async: true,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      alert('succeed!') //可以替换为自己的方法
      closeModal();
      data.deleteAll(); //清空formData
      $('.tbody').empty(); //清空列表
    },
    error: function (returndata) {
      alert('failed!') //可以替换为自己的方法
    }
  });
}
