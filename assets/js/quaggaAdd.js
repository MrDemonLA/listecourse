Quagga.init(
  {
    inputStream: {
      name: "Live",
      type: "LiveStream",
      target: document.querySelector("#AddCamera"),
    },
    decoder: {
      readers: ["code_128_reader"],
    },
  },
  function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
  }
);

Quagga.onDetected(function (data) {
  const code = data.codeResult.code;
  console.log(code);
  AddText.value = code;
  AddElement.disabled = false;
  AddElement.className = "Validated AddElement";
});

AddElement.addEventListener("click", () => {
  list.push(AddText.value);
  console.log(list);
  AddElement.disabled = true;
  AddElement.className = "AddElement";
  AddText.value = "";
});

console.log(list);
