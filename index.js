let file = document.getElementById("fil");
let img = document.querySelector(".mainImage img");
let butt = document.getElementById("butt");
let ball = document.createElement("div");
let red = new FileReader();
let form = new FormData();
let pl,
  filedata,
  ret = false,
  chakclick = false;
file.addEventListener("input", () => {
  filedata = file.files[0];
  red.readAsDataURL(filedata);
  red.onloadend = () => {
    img.src = red.result;
    img.style.cssText = "z-index: 2;opacity: 1;";
    butt.style.cssText = "opacity: 1;cursor: pointer;";
    chakclick = true;
    document.querySelector(".upbutt").style.cssText = "opacity: 0;";
  };
});
butt.addEventListener("click", () => {
  if (chakclick && !ret) {
    wait(true);
    bakrmov();
  } else if (chakclick && ret) {
    down();
  }
});
function wait(a) {
  if (a) {
    butt.innerHTML = "Please Wait";
    butt.style.cssText = "opacity: 0.2;cursor: not-allowed;";
    img.style.cssText = "z-index: 2;opacity: 0;";
    ball.classList.add("ball");
    let mainIm = document.querySelector(".mainImage");
    ball.style.transition = "0.5s";
    ball.style.left = `0px`;
    ball.style.top = `0px`;
    mainIm.appendChild(ball);
    chakclick = false;
    pl = setInterval(() => {
      ball.style.left = `${rand(0, img.clientWidth)}px`;
      ball.style.top = `${rand(0, img.clientWidth)}px`;
    }, 600);
  } else {
    clearInterval(pl);
    ball.remove();
    chakclick = true;
    butt.innerHTML = "Download";
    img.style.cssText = "z-index: 2;opacity: 1;";
    butt.style.cssText = "opacity: 1;cursor: pointer;";
  }
}
function rand(min, max) {
  max /= 2;
  min /= 2;
  console.log(Math.floor(Math.random() * (max - min + 1)) + min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function bakrmov() {
  form.append("image_file", filedata);
  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": "5ifK55bozudfrbVJxCmdjkMJ",
    },
    body: form,
  })
    .then((res) => res.blob())
    .then((data) => {
      red.readAsDataURL(data);
      red.onloadend = () => {
        img.src = red.result;
        img.style.cssText = "z-index: 2;opacity: 1;";
        butt.style.cssText = "opacity: 1;cursor: pointer;";
        chakclick = true;
        ret = true;
        wait(false);
      };
    });
}
function down() {
  let fildon = document.createElement("a");
  fildon.href = img.src;
  fildon.download = "potoA-A-B.png";
  console.log("s");
  document.body.appendChild(fildon);
  fildon.click();
  fildon.remove();
}
// key : 5ifK55bozudfrbVJxCmdjkMJ
// add : https://api.remove.bg/v1.0/removebg
