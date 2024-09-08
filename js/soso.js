var passInput = document.getElementById('pass');
var resultDiv = document.getElementById('result-container');
var clearButton = document.getElementById('clear');

passInput.addEventListener('input', function() {
  var keyword = this.value.trim().toLowerCase();
  if (keyword.length > 0) {
    resultDiv.innerHTML = '';

    // 显示新的搜索结果加"10cs"专属密钥
    fetch('https://gwssq.com/php/githubAPI/ccc.php?keyword=' + keyword + '&userId=10cs')
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          resultDiv.innerHTML = '<div class="error">' + data.error + '</div>';
        } else if (data.length > 0) {
          data.forEach(function(item) {
            var div = createResultItem(item.keyword, item.description);
            resultDiv.appendChild(div);
          });
          resultDiv.style.display = 'block';
        } else {
          resultDiv.style.display = 'none';
        }
      })
      .catch(error => console.error(error));
  } else {
    resultDiv.style.display = 'none';
  }
});

clearButton.addEventListener('click', function() {
  passInput.value = '';
  resultDiv.style.display = 'none';
});

document.addEventListener('click', function(event) {
  if (event.target !== passInput && event.target !== resultDiv) {
    resultDiv.style.display = 'none';
  }
});

// 创建一个搜索结果项
function createResultItem(keyword, description) {
  var div = document.createElement('div');
  div.className = 'item';
  var divContent = '';

  // 在结果项中显示关键字和描述
  divContent += '<span class="keyword">' + highlightKeyword(String(keyword), passInput.value) + '</span>';
  divContent += '<div class="description">' + String(description) + '</div>';
  div.innerHTML = divContent;

  // 点击结果项时处理
  div.addEventListener('click', function() {
    passInput.value = keyword;
    resultDiv.style.display = 'none';
    passInput.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': 13}));
  });

  return div;
}

// 标记关键字高亮
function highlightKeyword(keyword, input) {
  var regex = new RegExp(input, "gi");
  return keyword.replace(regex, function(match) {
    return '<span class="highlight">' + match + '</span>';
  });
}
