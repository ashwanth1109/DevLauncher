const saveLatestCommitHash = function () {
  const elemArr = document.getElementsByClassName(
    "f6 link-gray text-mono ml-2 d-none d-lg-inline"
  );

  if (elemArr.length < 1) {
    console.error("Error finding commit hash element in DOM");
    return;
  }

  const elem = elemArr[0];

  chrome.runtime.sendMessage({ hash: elem.innerText });
};

function pollForCommitHash() {
  const intervalTimer = setInterval(checkForCommitHash, 1000);

  function checkForCommitHash() {
    const elemArr = document.getElementsByClassName(
      "f6 link-gray text-mono ml-2 d-none d-lg-inline"
    );

    if (elemArr.length > 0) {
      clearInterval(intervalTimer);
      saveLatestCommitHash();
    }
  }
}

window.addEventListener("load", pollForCommitHash, false);
