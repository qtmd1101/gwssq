function check() {    // 获取用户输入的 pass    var passValue = encodeURIComponent(document.getElementById("pass").value);        userIdValue = encodeURIComponent("10cs");//专属密钥值   //发送请求    if (!userIdValue) {        return; }    var xmlhttp = new XMLHttpRequest();    xmlhttp.onreadystatechange = function() {        if (this.readyState == 4 && this.status == 200) {            if (this.responseText.trim() === "不存在") {                // 显示找不到的提示框                var alertBox = document.createElement("div");                alertBox.style.position = "fixed";                alertBox.style.top = "10%";                alertBox.style.left = "50%";                alertBox.style.transform = "translate(-50%, -50%)";                alertBox.style.backgroundColor = "lightgray";                alertBox.style.padding = "20px";                alertBox.style.borderRadius = "10px";                alertBox.style.boxShadow = "0 0 10px gray";                alertBox.innerHTML = "【官网搜索器】中暂无此数据，请稍等一会儿再试";                document.body.appendChild(alertBox);                setTimeout(function() {                    document.body.removeChild(alertBox);                }, 8000);            } else {                // 打开返回的链接                window.open(this.responseText, "_blank");            }        }    };    // 打开 POST 请求    xmlhttp.open("POST", "https://gwssq.com/php/githubAPI/pass.php", true);    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    xmlhttp.send("pass=" + passValue + "&userId=" + userIdValue);    recordRequest();}