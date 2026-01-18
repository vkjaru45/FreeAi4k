const slider = document.getElementById("slider");
slider.oninput = function () {
  document.querySelector(".after-wrapper").style.width = slider.value + "%";
};

async function upscale() {
  const file = document.getElementById("imageInput").files[0];
  if (!file) return alert("Upload an image");

  document.getElementById("status").innerText = "Enhancing image with AI...";
  document.getElementById("sliderBox").style.display = "block";

  document.getElementById("beforeImg").src = URL.createObjectURL(file);

  const response = await fetch(
    "https://api-inference.huggingface.co/models/caidas/swin2SR-classical-sr-x4-64",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_HF_API_KEY"
      },
      body: file
    }
  );

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  document.getElementById("afterImg").src = url;
  document.getElementById("downloadBtn").href = url;
  document.getElementById("downloadBtn").style.display = "block";
  document.getElementById("status").innerText = "Done! Compare & download.";
}
